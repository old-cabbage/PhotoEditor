// @ts-ignore;
import React, { useState, useRef } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, CardHeader, CardTitle, Progress, Alert, AlertDescription, AlertTitle, useToast } from '@/components/ui';
// @ts-ignore;
import { Upload, Image, Download, ArrowLeft, CheckCircle, AlertCircle, Loader2, Sparkles, Camera, Palette, Wand2, Eye, Zap, Layers } from 'lucide-react';

// @ts-ignore;
import { Navbar } from '@/components/Navbar';
// @ts-ignore;

export default function ImageServices(props) {
  const {
    $w,
    style
  } = props;
  const {
    toast
  } = useToast();
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [processing, setProcessing] = useState({});
  const fileInputRef = useRef(null);
  const [dragActive, setDragActive] = useState(false);
  const [selectedService, setSelectedService] = useState($w.page.dataset.params.service || 'ai-enhance');
  const services = {
    'ai-enhance': {
      title: 'AI图片超清',
      description: '使用AI技术将低分辨率图片提升至高清质量',
      icon: Sparkles,
      color: 'from-purple-500 to-pink-500',
      acceptTypes: 'image/*',
      maxSize: '50MB',
      features: ['2x/4x放大', '细节增强', '噪点减少']
    },
    'photo-restore': {
      title: '老照片修复',
      description: '智能修复老旧、褪色、破损的照片',
      icon: Camera,
      color: 'from-amber-500 to-orange-500',
      acceptTypes: 'image/*',
      maxSize: '50MB',
      features: ['褪色修复', '划痕去除', '色彩还原']
    },
    'colorize': {
      title: '黑白上色',
      description: '为黑白照片智能上色，还原真实色彩',
      icon: Palette,
      color: 'from-blue-500 to-cyan-500',
      acceptTypes: 'image/*',
      maxSize: '50MB',
      features: ['智能上色', '自然色彩', '肤色优化']
    },
    'background-remove': {
      title: '背景移除',
      description: '精准移除图片背景',
      icon: Layers,
      color: 'from-green-500 to-emerald-500',
      acceptTypes: 'image/*',
      maxSize: '50MB',
      features: ['一键移除', '边缘优化', '透明背景']
    },
    'style-transfer': {
      title: '风格转换',
      description: '将图片转换为艺术风格',
      icon: Wand2,
      color: 'from-indigo-500 to-purple-500',
      acceptTypes: 'image/*',
      maxSize: '50MB',
      features: ['多种风格', '艺术效果', '保持细节']
    },
    'face-enhance': {
      title: '人脸美化',
      description: '智能人脸美化和增强',
      icon: Eye,
      color: 'from-pink-500 to-rose-500',
      acceptTypes: 'image/*',
      maxSize: '50MB',
      features: ['智能美颜', '细节保留', '自然效果']
    },
    'denoise': {
      title: '图片降噪',
      description: '去除图片中的噪点和颗粒',
      icon: Zap,
      color: 'from-yellow-500 to-red-500',
      acceptTypes: 'image/*',
      maxSize: '50MB',
      features: ['智能降噪', '细节保护', '质量提升']
    }
  };
  const currentService = services[selectedService] || services['ai-enhance'];
  const Icon = currentService.icon;
  const handleDrag = e => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };
  const handleDrop = e => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };
  const handleFileInput = e => {
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };
  const handleFiles = fileList => {
    const newFiles = Array.from(fileList).map(file => ({
      id: Date.now() + Math.random(),
      name: file.name,
      size: file.size,
      type: file.type,
      file: file,
      status: 'pending',
      progress: 0,
      uploadTime: new Date().toISOString(),
      service: selectedService
    }));
    setFiles(prev => [...prev, ...newFiles]);
    newFiles.forEach(file => uploadFile(file));
  };
  const uploadFile = async fileObj => {
    setUploading(true);
    setProcessing(prev => ({
      ...prev,
      [fileObj.id]: true
    }));
    try {
      // 模拟上传进度
      for (let i = 0; i <= 100; i += 10) {
        await new Promise(resolve => setTimeout(resolve, 200));
        setFiles(prev => prev.map(f => f.id === fileObj.id ? {
          ...f,
          progress: i
        } : f));
      }

      // 模拟处理完成
      setFiles(prev => prev.map(f => f.id === fileObj.id ? {
        ...f,
        status: 'completed',
        progress: 100
      } : f));
      toast({
        title: "处理成功",
        description: `${currentService.title}处理完成：${fileObj.name}`
      });
    } catch (error) {
      setFiles(prev => prev.map(f => f.id === fileObj.id ? {
        ...f,
        status: 'error'
      } : f));
      toast({
        title: "处理失败",
        description: `处理失败：${error.message}`,
        variant: "destructive"
      });
    } finally {
      setUploading(false);
      setProcessing(prev => ({
        ...prev,
        [fileObj.id]: false
      }));
    }
  };
  const downloadFile = fileObj => {
    // 模拟下载
    const link = document.createElement('a');
    link.href = '#';
    link.download = `${currentService.title}_${fileObj.name}`;
    link.click();
    toast({
      title: "下载开始",
      description: `正在下载 ${fileObj.name}`
    });
  };
  const deleteFile = fileId => {
    setFiles(prev => prev.filter(f => f.id !== fileId));
    toast({
      title: "删除成功",
      description: "文件已从列表中移除"
    });
  };
  const formatFileSize = bytes => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };
  const getStatusIcon = status => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case 'processing':
        return <Loader2 className="h-4 w-4 text-blue-500 animate-spin" />;
      default:
        return <Image className="h-4 w-4 text-gray-500" />;
    }
  };
  return <div style={style} className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
          <Navbar $w={$w} />
          
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Header */}
            <div className="flex items-center mb-8">
              <Button variant="outline" onClick={() => $w.utils.navigateTo({
          pageId: 'home'
        })} className="flex items-center gap-2 mr-4">
                <ArrowLeft className="h-4 w-4" />
                返回首页
              </Button>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${currentService.color}`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-gray-800">{currentService.title}</h1>
                    <p className="text-gray-600">{currentService.description}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Service Features */}
            <div className="mb-8">
              <div className="flex flex-wrap gap-2">
                {currentService.features.map((feature, index) => <span key={index} className="inline-block px-4 py-2 bg-white rounded-full text-sm font-medium text-gray-700 shadow-sm">
                    {feature}
                  </span>)}
              </div>
            </div>

            {/* Upload Area */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5" />
                  上传图片
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${dragActive ? 'border-green-500 bg-green-50' : 'border-gray-300 hover:border-gray-400'}`} onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}>
                  <Icon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-lg font-medium text-gray-700 mb-2">
                    拖拽图片到此处或点击选择文件
                  </p>
                  <p className="text-sm text-gray-500 mb-4">
                    支持 JPG、PNG、GIF、WebP 等格式，最大文件大小 {currentService.maxSize}
                  </p>
                  <Button onClick={() => fileInputRef.current?.click()} disabled={uploading}>
                    {uploading ? '处理中...' : '选择图片'}
                  </Button>
                  <input ref={fileInputRef} type="file" multiple accept={currentService.acceptTypes} onChange={handleFileInput} className="hidden" />
                </div>
              </CardContent>
            </Card>

            {/* File List */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Image className="h-5 w-5" />
                    处理列表
                  </div>
                  <span className="text-sm font-normal text-gray-500">
                    共 {files.length} 个文件
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {files.length === 0 ? <div className="text-center py-8 text-gray-500">
                    <Image className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>暂无文件，请先上传图片</p>
                  </div> : <div className="space-y-4">
                    {files.map(file => <div key={file.id} className="border rounded-lg p-4 bg-white">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-3">
                            {getStatusIcon(file.status)}
                            <div>
                              <p className="font-medium text-gray-800">{file.name}</p>
                              <p className="text-sm text-gray-500">
                                {formatFileSize(file.size)} • {new Date(file.uploadTime).toLocaleString()}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {file.status === 'completed' && <Button size="sm" variant="outline" onClick={() => downloadFile(file)} className="flex items-center gap-1">
                                <Download className="h-4 w-4" />
                                下载
                              </Button>}
                            <Button size="sm" variant="outline" onClick={() => deleteFile(file.id)} className="flex items-center gap-1 text-red-600 hover:text-red-700">
                              <AlertCircle className="h-4 w-4" />
                              删除
                            </Button>
                          </div>
                        </div>
                        
                        {file.status === 'processing' && <div className="mt-3">
                            <Progress value={file.progress} className="h-2" />
                            <p className="text-sm text-gray-500 mt-1">
                              {currentService.title}处理中... {file.progress}%
                            </p>
                          </div>}
                        
                        {file.status === 'error' && <Alert className="mt-3" variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>
                              {currentService.title}处理失败，请重试
                            </AlertDescription>
                          </Alert>}
                        
                        {file.status === 'completed' && <Alert className="mt-3">
                            <CheckCircle className="h-4 w-4" />
                            <AlertDescription>
                              {currentService.title}处理完成，可以下载
                            </AlertDescription>
                          </Alert>}
                      </div>)}
                  </div>}
              </CardContent>
            </Card>
          </div>
        </div>;
}