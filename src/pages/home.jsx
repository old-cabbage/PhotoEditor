// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Button, Card, CardContent, CardHeader, CardTitle, useToast } from '@/components/ui';
// @ts-ignore;
import { Image, Sparkles, Camera, Palette, Wand2, Eye, Zap, Layers, ChevronRight } from 'lucide-react';

// @ts-ignore;
import { Navbar } from '@/components/Navbar';
// @ts-ignore;

export default function Home(props) {
  const {
    $w,
    style
  } = props;
  const {
    toast
  } = useToast();
  const imageServices = [{
    id: 'ai-enhance',
    title: 'AI图片超清',
    description: '使用AI技术将低分辨率图片提升至高清质量，支持2x、4x放大',
    icon: Sparkles,
    color: 'bg-gradient-to-r from-purple-500 to-pink-500',
    features: ['2x/4x放大', '细节增强', '噪点减少', '边缘锐化'],
    popular: true
  }, {
    id: 'photo-restore',
    title: '老照片修复',
    description: '智能修复老旧、褪色、破损的照片，恢复原始色彩和细节',
    icon: Camera,
    color: 'bg-gradient-to-r from-amber-500 to-orange-500',
    features: ['褪色修复', '划痕去除', '色彩还原', '细节重建']
  }, {
    id: 'colorize',
    title: '黑白上色',
    description: '为黑白照片智能上色，还原真实色彩效果',
    icon: Palette,
    color: 'bg-gradient-to-r from-blue-500 to-cyan-500',
    features: ['智能上色', '自然色彩', '肤色优化', '场景识别']
  }, {
    id: 'background-remove',
    title: '背景移除',
    description: '精准移除图片背景，支持人像、产品等多种场景',
    icon: Layers,
    color: 'bg-gradient-to-r from-green-500 to-emerald-500',
    features: ['一键移除', '边缘优化', '透明背景', '批量处理']
  }, {
    id: 'style-transfer',
    title: '风格转换',
    description: '将图片转换为艺术风格，如油画、素描、卡通等',
    icon: Wand2,
    color: 'bg-gradient-to-r from-indigo-500 to-purple-500',
    features: ['多种风格', '艺术效果', '保持细节', '实时预览']
  }, {
    id: 'face-enhance',
    title: '人脸美化',
    description: '智能人脸美化和增强，包括磨皮、瘦脸、大眼等效果',
    icon: Eye,
    color: 'bg-gradient-to-r from-pink-500 to-rose-500',
    features: ['智能美颜', '细节保留', '自然效果', '参数调节']
  }, {
    id: 'denoise',
    title: '图片降噪',
    description: '去除图片中的噪点和颗粒，提升图片清晰度',
    icon: Zap,
    color: 'bg-gradient-to-r from-yellow-500 to-red-500',
    features: ['智能降噪', '细节保护', '质量提升', '批量处理']
  }, {
    id: 'format-convert',
    title: '格式转换',
    description: '支持多种图片格式之间的转换，包括WebP、AVIF等新格式',
    icon: Image,
    color: 'bg-gradient-to-r from-gray-500 to-slate-500',
    features: ['多格式支持', '质量调节', '批量转换', '压缩优化']
  }];
  const handleServiceClick = service => {
    if (!$w.auth.currentUser?.userId) {
      toast({
        title: "请先登录",
        description: "使用图片处理服务需要先登录账号",
        variant: "destructive"
      });
      return;
    }
    $w.utils.navigateTo({
      pageId: 'image-services',
      params: {
        service: service.id
      }
    });
  };
  return <div style={style} className="min-h-screen relative overflow-hidden">
          {/* 舒缓渐变背景 */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
            {/* 装饰性光晕 */}
            <div className="absolute top-20 left-20 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
            <div className="absolute top-40 right-20 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{
        animationDelay: '2s'
      }}></div>
            <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{
        animationDelay: '4s'
      }}></div>
            
            {/* 装饰性几何图案 */}
            <div className="absolute top-32 left-32 w-64 h-64 border-2 border-purple-200 rounded-full opacity-20 transform rotate-12"></div>
            <div className="absolute bottom-40 right-40 w-48 h-48 border-2 border-blue-200 rounded-lg opacity-20 transform -rotate-6"></div>
            <div className="absolute top-1/2 left-20 w-32 h-32 border-2 border-pink-200 opacity-20 transform rotate-45"></div>
            
            {/* 波浪装饰 */}
            <svg className="absolute bottom-0 left-0 w-full h-32" preserveAspectRatio="none" viewBox="0 0 1200 120">
              <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="rgba(147, 51, 234, 0.05)"></path>
            </svg>
            <svg className="absolute bottom-0 left-0 w-full h-24" preserveAspectRatio="none" viewBox="0 0 1200 120">
              <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="rgba(59, 130, 246, 0.05)"></path>
            </svg>
          </div>
          
          {/* 内容区域 */}
          <div className="relative z-10">
            <Navbar $w={$w} />
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              {/* Hero Section */}
              <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-6 shadow-lg">
                  <Image className="h-10 w-10 text-white" />
                </div>
                <h1 className="text-5xl font-bold text-gray-800 mb-4">
                  AI图片处理
                </h1>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                  运用前沿AI技术，为您提供专业级的图片处理服务
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">智能处理</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">高质量输出</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
                    <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">秒级处理</span>
                  </div>
                </div>
              </div>

              {/* Services Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
                {imageServices.map(service => {
            const Icon = service.icon;
            return <Card key={service.id} className={`hover:shadow-xl transition-all duration-300 cursor-pointer group relative overflow-hidden backdrop-blur-sm bg-white/90 ${service.popular ? 'ring-2 ring-purple-500 ring-offset-2' : ''}`} onClick={() => handleServiceClick(service)}>
                      {service.popular && <div className="absolute top-3 right-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs px-2 py-1 rounded-full z-10">
                          热门
                        </div>}
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <div className={`p-4 rounded-xl ${service.color} group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                            <Icon className="h-8 w-8 text-white" />
                          </div>
                          <ChevronRight className="h-6 w-6 text-gray-400 group-hover:text-gray-600 transition-colors duration-300" />
                        </div>
                        <CardTitle className="text-xl">{service.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                          {service.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {service.features.map((feature, index) => <span key={index} className="inline-block px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded-full">
                              {feature}
                            </span>)}
                        </div>
                      </CardContent>
                    </Card>;
          })}
              </div>

              {/* Features Section */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 mb-12">
                <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
                  为什么选择我们的AI图片处理
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="text-center">
                    <div className="bg-gradient-to-r from-purple-100 to-pink-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Sparkles className="h-10 w-10 text-purple-600" />
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-2 text-lg">AI驱动</h3>
                    <p className="text-gray-600">
                      基于深度学习的先进算法，提供专业级图片处理效果
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="bg-gradient-to-r from-blue-100 to-cyan-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Zap className="h-10 w-10 text-blue-600" />
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-2 text-lg">极速处理</h3>
                    <p className="text-gray-600">
                      优化的处理引擎，秒级完成复杂图片处理任务
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="bg-gradient-to-r from-pink-100 to-purple-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Eye className="h-10 w-10 text-pink-600" />
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-2 text-lg">品质保证</h3>
                    <p className="text-gray-600">
                      保持原图细节，输出高质量处理结果
                    </p>
                  </div>
                </div>
              </div>

              {/* CTA Section */}
              <div className="text-center bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-8 text-white shadow-2xl">
                <h2 className="text-3xl font-bold mb-4">
                  开始体验AI图片处理
                </h2>
                <p className="text-xl mb-6 opacity-90">
                  选择您需要的服务，让AI为您的图片带来全新改变
                </p>
                <Button size="lg" variant="secondary" className="bg-white text-purple-600 hover:bg-gray-100">
                  立即开始
                </Button>
              </div>
            </div>
          </div>
        </div>;
}