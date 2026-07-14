import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Camera, MapPin, X, ChevronLeft, ChevronRight, Heart, Share2, Info } from "lucide-react";

interface GalleryImage {
  id: string;
  url: string;
  title: string;
  category: "campsites" | "passes" | "group" | "scenic";
  location: string;
  elevation: string;
  photographer: string;
  cameraSettings: string;
  description: string;
}

const GALLERY_IMAGES: GalleryImage[] = [
  {
    id: "gal-1",
    url: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?q=80&w=800&auto=format&fit=crop",
    title: "Riverside Campfire",
    category: "campsites",
    location: "Parvati Valley, Kasol",
    elevation: "5,183 ft",
    photographer: "@wild_expeditions",
    cameraSettings: "Sony α7R III • 28mm • f/2.0 • ISO 1600 • 15s",
    description: "An unedited 15-second exposure of our riverside dome camp under the majestic Milky Way core in Kasol."
  },
  {
    id: "gal-2",
    url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800&auto=format&fit=crop",
    title: "Rohtang Ridge Peak",
    category: "passes",
    location: "Rohtang Pass, Manali",
    elevation: "13,058 ft",
    photographer: "@himalayan_stories",
    cameraSettings: "Fujifilm X-T4 • 16mm • f/5.6 • ISO 160 • 1/500s",
    description: "The crisp morning light casting long shadows across the jagged, snow-capped ridges of the Rohtang highway."
  },
  {
    id: "gal-3",
    url: "https://images.unsplash.com/photo-1486916856992-e4db22c8df33?q=80&w=800&auto=format&fit=crop",
    title: "The Sweeping Curves",
    category: "scenic",
    location: "Beas River Road, Manali",
    elevation: "6,700 ft",
    photographer: "@roadtrippers_co",
    cameraSettings: "Canon EOS R5 • 24mm • f/4.0 • ISO 100 • 1/250s",
    description: "Our deluxe Tempo Traveller carving through towering deodar forests alongside the rushing turquoise Beas River."
  },
  {
    id: "gal-4",
    url: "https://images.unsplash.com/photo-1539635278303-d4002c07eae3?q=80&w=800&auto=format&fit=crop",
    title: "Strangers Into Family",
    category: "group",
    location: "Old Manali Cafe Hub",
    elevation: "6,900 ft",
    photographer: "@capt_travo",
    cameraSettings: "Sony α7 IV • 35mm • f/1.8 • ISO 800 • 1/125s",
    description: "Laughter, hot chai, and shared stories. This photo was taken just 24 hours into the trip—already inseparable."
  },
  {
    id: "gal-5",
    url: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?q=80&w=800&auto=format&fit=crop",
    title: "UNESCO Floral Meadows",
    category: "passes",
    location: "Valley of Flowers National Park",
    elevation: "11,811 ft",
    photographer: "@botanist_abroad",
    cameraSettings: "Nikon Z6 II • 50mm • f/2.8 • ISO 200 • 1/320s",
    description: "Thousands of wild blue poppies, bellflowers, and rare Himalayan orchids blooming together in absolute harmony."
  },
  {
    id: "gal-6",
    url: "https://images.unsplash.com/photo-1537905569824-f89f14cceb68?q=80&w=800&auto=format&fit=crop",
    title: "Kasol Star Glamping",
    category: "campsites",
    location: "Premium Campsite, Kasol",
    elevation: "5,200 ft",
    photographer: "@forest_nomad",
    cameraSettings: "Sony α7R V • 24mm • f/1.4 • ISO 3200 • 10s",
    description: "A cozy look inside our premium dome glamping tents, lit with warm lanterns against the freezing alpine night."
  },
  {
    id: "gal-7",
    url: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=800&auto=format&fit=crop",
    title: "14,203 ft Mirror Pool",
    category: "scenic",
    location: "Hemkund Sahib glacial lake",
    elevation: "14,203 ft",
    photographer: "@spiritual_hikes",
    cameraSettings: "iPhone 15 Pro • 24mm equivalent • f/1.78 • ISO 50 • 1/800s",
    description: "The glassy, crystalline mirror water of Hemkund Sahib lake reflecting towering glacial peaks on a windless afternoon."
  },
  {
    id: "gal-8",
    url: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=80&w=800&auto=format&fit=crop",
    title: "Confluence of Devprayag",
    category: "scenic",
    location: "Devprayag, Uttarakhand",
    elevation: "2,723 ft",
    photographer: "@capt_travo",
    cameraSettings: "Canon EOS R • 70mm • f/5.0 • ISO 200 • 1/400s",
    description: "The dramatic physical collision where the calm, deep Alaknanda River meets the rapid, sparkling Bhagirathi River."
  }
];

export default function GallerySection() {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [likedImages, setLikedImages] = useState<Record<string, boolean>>({});

  const filteredImages = activeTab === "all" 
    ? GALLERY_IMAGES 
    : GALLERY_IMAGES.filter(img => img.category === activeTab);

  const toggleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedImages(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handlePrev = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (selectedImageIndex === null) return;
    const prevIndex = (selectedImageIndex - 1 + filteredImages.length) % filteredImages.length;
    setSelectedImageIndex(prevIndex);
  };

  const handleNext = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (selectedImageIndex === null) return;
    const nextIndex = (selectedImageIndex + 1) % filteredImages.length;
    setSelectedImageIndex(nextIndex);
  };

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImageIndex === null) return;
      if (e.key === "Escape") setSelectedImageIndex(null);
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImageIndex, filteredImages]);

  return (
    <section id="gallery" className="relative bg-white py-24 px-6 border-t border-b border-neutral-200 overflow-hidden text-neutral-900">
      {/* Absolute Ambient Glows */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-brand-sand/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-brand-sand/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        
        {/* Header Block */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center space-x-2.5 bg-brand-sand/15 border border-brand-sand/30 px-3.5 py-1.5 rounded-full">
            <Camera className="w-3.5 h-3.5 text-[#9C753B]" />
            <span className="text-[10px] md:text-xs font-black tracking-[0.25em] text-[#9C753B] uppercase">
              Cosmic Lens & Moments
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-black tracking-tight text-neutral-900 uppercase">
            Visual Chronicles
          </h2>
          <p className="text-sm text-neutral-600 font-medium leading-relaxed">
            Real, raw, and completely unedited glimpses of starlit campsites, sweeping mountain curves, and the unbreakable friendships forged along the highway.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center items-center gap-2.5 max-w-3xl mx-auto py-2">
          {[
            { id: "all", label: "ALL SHOTS" },
            { id: "campsites", label: "CAMPSITES" },
            { id: "passes", label: "HIGH PASSES" },
            { id: "scenic", label: "SCENIC ROADS" },
            { id: "group", label: "GROUP VIBES" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2.5 text-[10px] md:text-xs font-black tracking-[0.18em] rounded-full border transition-all duration-300 focus:outline-none ${
                activeTab === tab.id
                  ? "bg-[#9C753B] text-white border-[#9C753B] shadow-md"
                  : "bg-[#FAF9F6] border-neutral-200 text-neutral-600 hover:text-neutral-900 hover:border-[#9C753B]/50"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Dynamic Photo Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredImages.map((img, index) => (
              <motion.div
                layout
                key={img.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                onClick={() => setSelectedImageIndex(index)}
                className="group relative rounded-2xl overflow-hidden bg-white border border-neutral-200 hover:border-[#9C753B] hover:shadow-lg transition-all duration-500 cursor-pointer min-h-[360px] flex flex-col justify-between shadow-sm"
              >
                {/* Background Image */}
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out scale-100 group-hover:scale-105 filter saturate-90 group-hover:saturate-105"
                  style={{ backgroundImage: `url(${img.url})` }}
                />
                
                {/* Visual Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-black/10 opacity-90 group-hover:opacity-95 transition-opacity" />

                {/* Top Badge Overlay */}
                <div className="relative p-4 flex justify-between items-start">
                  <span className="bg-neutral-900/75 backdrop-blur-md text-[9px] font-black tracking-widest text-brand-sand px-3 py-1 rounded-full border border-white/10 uppercase select-none">
                    {img.elevation}
                  </span>
                  <button 
                    onClick={(e) => toggleLike(img.id, e)}
                    className="w-8 h-8 rounded-full bg-neutral-900/75 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-[#090D16] hover:border-red-500/30 transition-colors"
                  >
                    <Heart 
                      className={`w-3.5 h-3.5 transition-colors ${
                        likedImages[img.id] ? "text-red-500 fill-red-500" : "text-gray-300 group-hover:text-white"
                      }`} 
                    />
                  </button>
                </div>

                {/* Bottom Text Content */}
                <div className="relative p-5 space-y-2 mt-auto transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <div className="flex items-center space-x-1.5 text-brand-sand font-mono text-[10px] tracking-wider uppercase select-none">
                    <MapPin className="w-3 h-3 text-brand-sand" />
                    <span>{img.location}</span>
                  </div>
                  <h3 className="text-base font-display font-black tracking-tight text-white group-hover:text-brand-sand transition-colors">
                    {img.title}
                  </h3>
                  <p className="text-[11px] text-gray-300 font-medium line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {img.description}
                  </p>
                  
                  {/* Subtle Camera settings ribbon */}
                  <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[9px] font-mono text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 select-none">
                    <span className="truncate">{img.photographer}</span>
                    <span>EXIF DATA</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>

      {/* Lightbox Immersive Fullscreen Modal */}
      <AnimatePresence>
        {selectedImageIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-8"
            onClick={() => setSelectedImageIndex(null)}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedImageIndex(null)}
              className="absolute top-6 right-6 z-50 w-12 h-12 rounded-full bg-neutral-900/80 border border-white/10 flex items-center justify-center text-white hover:text-brand-sand hover:border-brand-sand/50 transition-colors focus:outline-none"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Navigation Buttons */}
            <button
              onClick={handlePrev}
              className="absolute left-4 md:left-8 z-50 w-12 h-12 rounded-full bg-neutral-900/80 border border-white/10 flex items-center justify-center text-white hover:text-brand-sand hover:border-brand-sand/50 transition-colors focus:outline-none"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={handleNext}
              className="absolute right-4 md:right-8 z-50 w-12 h-12 rounded-full bg-neutral-900/80 border border-white/10 flex items-center justify-center text-white hover:text-brand-sand hover:border-brand-sand/50 transition-colors focus:outline-none"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Modal Content Frame */}
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ type: "spring", damping: 25, stiffness: 180 }}
              className="w-full max-w-5xl bg-[#090D16] border border-white/10 rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row relative z-10"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Photo Side */}
              <div className="w-full md:w-3/5 bg-black flex items-center justify-center relative min-h-[250px] md:min-h-[500px]">
                <img 
                  src={filteredImages[selectedImageIndex].url} 
                  alt={filteredImages[selectedImageIndex].title}
                  className="w-full h-full object-contain max-h-[70vh]"
                />
                <span className="absolute top-4 left-4 bg-black/75 backdrop-blur-md text-[10px] font-black tracking-widest text-brand-sand px-3 py-1 rounded-full border border-white/5 uppercase select-none">
                  {filteredImages[selectedImageIndex].elevation}
                </span>
              </div>

              {/* Sidebar Info Side */}
              <div className="w-full md:w-2/5 p-6 md:p-8 flex flex-col justify-between space-y-6 bg-neutral-900/60">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 text-brand-sand font-mono text-[11px] tracking-wider uppercase select-none">
                    <MapPin className="w-3.5 h-3.5 text-brand-sand" />
                    <span>{filteredImages[selectedImageIndex].location}</span>
                  </div>
                  
                  <h3 className="text-2xl font-display font-black tracking-tight text-white uppercase">
                    {filteredImages[selectedImageIndex].title}
                  </h3>

                  <div className="h-px bg-white/10 w-12" />

                  <p className="text-sm text-gray-300 font-medium leading-relaxed">
                    {filteredImages[selectedImageIndex].description}
                  </p>
                </div>

                <div className="space-y-4 pt-4 border-t border-white/5">
                  {/* Camera parameters metadata */}
                  <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 flex items-start space-x-3 text-xs text-gray-400 font-mono">
                    <Info className="w-4 h-4 text-brand-sand shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <span className="text-[10px] text-gray-500 font-bold block select-none">CAMERA EXIF DATA</span>
                      <span className="leading-relaxed select-all">{filteredImages[selectedImageIndex].cameraSettings}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-7 h-7 rounded-full bg-brand-sand text-neutral-900 font-black text-[10px] flex items-center justify-center select-none font-display">
                        TR
                      </div>
                      <div className="text-[11px] font-bold">
                        <span className="text-gray-500 block text-[9px] uppercase tracking-wider font-mono">PHOTO BY</span>
                        <span className="text-white font-mono">{filteredImages[selectedImageIndex].photographer}</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button 
                        onClick={(e) => toggleLike(filteredImages[selectedImageIndex].id, e)}
                        className={`w-9 h-9 rounded-full border flex items-center justify-center transition-colors ${
                          likedImages[filteredImages[selectedImageIndex].id]
                            ? "bg-red-500/20 border-red-500 text-red-500"
                            : "bg-[#090D16] border-white/5 text-gray-400 hover:text-white"
                        }`}
                      >
                        <Heart className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
