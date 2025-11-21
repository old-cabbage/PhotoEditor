// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Button, useToast } from '@/components/ui';
// @ts-ignore;
import { User, LogOut, Menu, X } from 'lucide-react';

export function Navbar(props) {
  const {
    $w
  } = props;
  const {
    toast
  } = useToast();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const isLoggedIn = Boolean($w.auth.currentUser?.userId);
  const user = $w.auth.currentUser;
  const handleLogin = async () => {
    try {
      const tcb = await $w.cloud.getCloudInstance();
      tcb.auth().toDefaultLoginPage({
        config_version: "env",
        redirect_uri: window.location.href,
        query: {
          s_domain: $w.utils.resolveStaticResourceUrl("/").replace(/^https?:\/\//, "").split("/")[0]
        }
      });
    } catch (error) {
      toast({
        title: "登录失败",
        description: error.message,
        variant: "destructive"
      });
    }
  };
  const handleLogout = async () => {
    try {
      const tcb = await $w.cloud.getCloudInstance();
      await tcb.auth().signOut();
      await tcb.auth().signInAnonymously();
      await $w.auth.getUserInfo({
        force: true
      });
      toast({
        title: "退出成功",
        description: "您已成功退出登录"
      });
    } catch (error) {
      toast({
        title: "退出失败",
        description: error.message,
        variant: "destructive"
      });
    }
  };
  return <nav className="bg-white shadow-md sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Logo */}
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <h1 className="text-xl font-bold text-indigo-600">文件处理中心</h1>
                </div>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-4">
                {isLoggedIn ? <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <User className="h-5 w-5 text-gray-600" />
                      <span className="text-gray-700">
                        {user?.nickName || user?.name || '用户'}
                      </span>
                    </div>
                    <Button variant="outline" size="sm" onClick={handleLogout} className="flex items-center gap-2">
                      <LogOut className="h-4 w-4" />
                      退出
                    </Button>
                  </div> : <Button onClick={handleLogin} className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    登录
                  </Button>}
              </div>

              {/* Mobile menu button */}
              <div className="md:hidden">
                <Button variant="ghost" size="sm" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                  {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </Button>
              </div>
            </div>

            {/* Mobile Navigation */}
            {mobileMenuOpen && <div className="md:hidden py-4 border-t">
                {isLoggedIn ? <div className="flex flex-col space-y-3">
                    <div className="flex items-center space-x-2 px-3">
                      <User className="h-5 w-5 text-gray-600" />
                      <span className="text-gray-700">
                        {user?.nickName || user?.name || '用户'}
                      </span>
                    </div>
                    <Button variant="outline" size="sm" onClick={handleLogout} className="flex items-center gap-2 justify-start px-3">
                      <LogOut className="h-4 w-4" />
                      退出
                    </Button>
                  </div> : <Button onClick={handleLogin} className="flex items-center gap-2 justify-start px-3 w-full">
                    <User className="h-4 w-4" />
                    登录
                  </Button>}
              </div>}
          </div>
        </nav>;
}