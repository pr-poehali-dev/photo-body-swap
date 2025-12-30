import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

interface Transform {
  id: string;
  image: string;
  timestamp: Date;
}

const Index = () => {
  const [activeSection, setActiveSection] = useState<'home' | 'transform' | 'gallery'>('home');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isTransforming, setIsTransforming] = useState(false);
  const [transforms, setTransforms] = useState<Transform[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      createParticle();
    }, 300);
    return () => clearInterval(interval);
  }, []);

  const createParticle = () => {
    const particle = document.createElement('div');
    particle.className = 'particle animate-float';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.width = Math.random() * 4 + 2 + 'px';
    particle.style.height = particle.style.width;
    particle.style.background = `rgba(${155 + Math.random() * 50}, ${135 + Math.random() * 50}, 245, ${Math.random() * 0.5 + 0.3})`;
    particle.style.animationDuration = Math.random() * 3 + 4 + 's';
    document.body.appendChild(particle);
    setTimeout(() => particle.remove(), 7000);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const startTransformation = () => {
    if (!selectedImage) return;
    
    setIsTransforming(true);
    setActiveSection('transform');
    
    setTimeout(() => {
      const newTransform: Transform = {
        id: Date.now().toString(),
        image: selectedImage,
        timestamp: new Date()
      };
      setTransforms(prev => [newTransform, ...prev]);
      setIsTransforming(false);
      
      toast({
        title: '✨ Трансформация завершена',
        description: 'Вы переместились в данное тело!',
        duration: 5000,
      });
      
      setSelectedImage(null);
    }, 3000);
  };

  const quickTransform = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setActiveSection('transform');
    
    setTimeout(() => {
      setIsTransforming(true);
      
      setTimeout(() => {
        const newTransform: Transform = {
          id: Date.now().toString(),
          image: imageUrl,
          timestamp: new Date()
        };
        setTransforms(prev => [newTransform, ...prev]);
        setIsTransforming(false);
        
        toast({
          title: '✨ Трансформация завершена',
          description: 'Вы переместились в данное тело!',
          duration: 5000,
        });
        
        setSelectedImage(null);
      }, 3000);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1A1F2C] via-[#2d1b4e] to-[#1A1F2C] relative overflow-hidden">
      <nav className="fixed top-0 w-full z-50 bg-black/30 backdrop-blur-md border-b border-primary/20">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold magic-text text-primary">Портал Трансформации</h1>
          <div className="flex gap-6">
            <button
              onClick={() => setActiveSection('home')}
              className={`text-lg transition-all ${activeSection === 'home' ? 'text-primary magic-text' : 'text-foreground/70 hover:text-primary'}`}
            >
              Главная
            </button>
            <button
              onClick={() => setActiveSection('transform')}
              className={`text-lg transition-all ${activeSection === 'transform' ? 'text-primary magic-text' : 'text-foreground/70 hover:text-primary'}`}
            >
              Трансформация
            </button>
            <button
              onClick={() => setActiveSection('gallery')}
              className={`text-lg transition-all ${activeSection === 'gallery' ? 'text-primary magic-text' : 'text-foreground/70 hover:text-primary'}`}
            >
              Галерея
            </button>
          </div>
        </div>
      </nav>

      <main className="pt-24 pb-12">
        {activeSection === 'home' && (
          <div className="container mx-auto px-4 animate-fade-in">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <div className="space-y-4">
                <h2 className="text-7xl font-bold magic-text animate-pulse-glow">
                  Добро пожаловать
                </h2>
                <p className="text-2xl text-foreground/80">
                  в мир магических трансформаций
                </p>
              </div>

              <div className="relative w-64 h-64 mx-auto my-12">
                <div className="absolute inset-0 bg-primary/20 rounded-full animate-pulse-glow"></div>
                <div className="absolute inset-4 bg-primary/30 rounded-full animate-pulse-glow animation-delay-150"></div>
                <div className="absolute inset-8 bg-primary/40 rounded-full animate-pulse-glow animation-delay-300"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Icon name="Sparkles" size={80} className="text-primary" />
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mt-16">
                <Card className="p-6 bg-card/50 backdrop-blur-sm border-primary/30 hover:border-primary transition-all hover:magic-glow cursor-pointer">
                  <Icon name="Upload" size={48} className="text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Загрузите фото</h3>
                  <p className="text-foreground/70">Выберите изображение тела для трансформации</p>
                </Card>
                
                <Card className="p-6 bg-card/50 backdrop-blur-sm border-primary/30 hover:border-primary transition-all hover:magic-glow cursor-pointer">
                  <Icon name="Wand2" size={48} className="text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Магия преобразования</h3>
                  <p className="text-foreground/70">Запустите процесс трансформации</p>
                </Card>
                
                <Card className="p-6 bg-card/50 backdrop-blur-sm border-primary/30 hover:border-primary transition-all hover:magic-glow cursor-pointer">
                  <Icon name="Eye" size={48} className="text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Новая реальность</h3>
                  <p className="text-foreground/70">Наблюдайте результат трансформации</p>
                </Card>
              </div>

              <div className="space-y-8">
                <Button
                  size="lg"
                  className="text-xl px-12 py-6 magic-glow hover:scale-105 transition-transform"
                  onClick={() => setActiveSection('transform')}
                >
                  <Icon name="Sparkles" className="mr-2" />
                  Начать трансформацию
                </Button>

                <div className="max-w-2xl mx-auto">
                  <p className="text-lg text-foreground/60 mb-4">Или попробуйте быструю трансформацию:</p>
                  <Card 
                    className="p-4 bg-card/50 backdrop-blur-sm border-primary/30 hover:border-primary transition-all hover:magic-glow cursor-pointer group"
                    onClick={() => quickTransform('https://cdn.poehali.dev/files/Screenshot_20251226-225103_YouTube.jpg')}
                  >
                    <div className="flex items-center gap-4">
                      <img 
                        src="https://cdn.poehali.dev/files/Screenshot_20251226-225103_YouTube.jpg" 
                        alt="Demo" 
                        className="w-24 h-24 object-cover rounded-lg group-hover:scale-110 transition-transform"
                      />
                      <div className="text-left flex-1">
                        <h4 className="text-lg font-semibold mb-1">Демо трансформация</h4>
                        <p className="text-sm text-foreground/60">Нажмите чтобы переместиться в это тело</p>
                      </div>
                      <Icon name="ArrowRight" size={32} className="text-primary group-hover:translate-x-2 transition-transform" />
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'transform' && (
          <div className="container mx-auto px-4 animate-fade-in">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-5xl font-bold text-center mb-12 magic-text">
                Портал Трансформации
              </h2>

              <Card className="p-8 bg-card/50 backdrop-blur-sm border-primary/30 magic-glow">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />

                {!selectedImage ? (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-primary/50 rounded-lg p-16 text-center cursor-pointer hover:border-primary transition-all hover:bg-primary/5"
                  >
                    <Icon name="Upload" size={64} className="text-primary mx-auto mb-4" />
                    <p className="text-xl mb-2">Загрузите изображение</p>
                    <p className="text-foreground/60">Нажмите или перетащите фото сюда</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="relative">
                      <img
                        src={selectedImage}
                        alt="Selected"
                        className="w-full h-96 object-cover rounded-lg"
                      />
                      {isTransforming && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/70 rounded-lg">
                          <div className="text-center space-y-4">
                            <div className="w-32 h-32 border-4 border-primary rounded-full animate-transform"></div>
                            <p className="text-2xl magic-text">Трансформация...</p>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex gap-4">
                      <Button
                        onClick={startTransformation}
                        disabled={isTransforming}
                        className="flex-1 text-lg py-6 magic-glow"
                      >
                        <Icon name="Wand2" className="mr-2" />
                        {isTransforming ? 'Трансформация...' : 'Переместиться в тело'}
                      </Button>
                      <Button
                        onClick={() => setSelectedImage(null)}
                        variant="outline"
                        disabled={isTransforming}
                        className="text-lg py-6"
                      >
                        <Icon name="X" />
                      </Button>
                    </div>
                  </div>
                )}
              </Card>
            </div>
          </div>
        )}

        {activeSection === 'gallery' && (
          <div className="container mx-auto px-4 animate-fade-in">
            <h2 className="text-5xl font-bold text-center mb-12 magic-text">
              Галерея Трансформаций
            </h2>

            {transforms.length === 0 ? (
              <div className="text-center py-16">
                <Icon name="ImageOff" size={64} className="text-foreground/30 mx-auto mb-4" />
                <p className="text-xl text-foreground/60">Пока нет трансформаций</p>
                <p className="text-foreground/40">Создайте свою первую трансформацию</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-3 gap-6">
                {transforms.map((transform) => (
                  <Card
                    key={transform.id}
                    className="overflow-hidden bg-card/50 backdrop-blur-sm border-primary/30 hover:border-primary transition-all hover:magic-glow cursor-pointer group"
                  >
                    <div className="relative">
                      <img
                        src={transform.image}
                        alt="Transform"
                        className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                        <div className="text-sm">
                          <p className="font-semibold">✨ Трансформация завершена</p>
                          <p className="text-foreground/70">
                            {transform.timestamp.toLocaleString('ru-RU')}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none" />
    </div>
  );
};

export default Index;