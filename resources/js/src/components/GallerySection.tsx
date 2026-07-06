import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Camera, ChevronLeft, ChevronRight, Heart, Info, MapPin, X } from "lucide-react";

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
  { id: "gal-1", url: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?q=80&w=900&auto=format&fit=crop", title: "Riverside Campfire", category: "campsites", location: "Parvati Valley, Kasol", elevation: "5,183 ft", photographer: "@wild_expeditions", cameraSettings: "Sony a7R III - 28mm - f/2.0 - ISO 1600", description: "A long-exposure glimpse of a riverside dome camp under the Milky Way core." },
  { id: "gal-2", url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=900&auto=format&fit=crop", title: "Rohtang Ridge Peak", category: "passes", location: "Rohtang Pass, Manali", elevation: "13,058 ft", photographer: "@himalayan_stories", cameraSettings: "Fujifilm X-T4 - 16mm - f/5.6 - ISO 160", description: "Crisp morning light across jagged, snow-capped ridges of the Rohtang highway." },
  { id: "gal-3", url: "https://images.unsplash.com/photo-1486916856992-e4db22c8df33?q=80&w=900&auto=format&fit=crop", title: "The Sweeping Curves", category: "scenic", location: "Beas River Road, Manali", elevation: "6,700 ft", photographer: "@roadtrippers_co", cameraSettings: "Canon EOS R5 - 24mm - f/4.0 - ISO 100", description: "A mountain road cutting through deodar forests beside turquoise river flows." },
  { id: "gal-4", url: "https://images.unsplash.com/photo-1539635278303-d4002c07eae3?q=80&w=900&auto=format&fit=crop", title: "Strangers Into Family", category: "group", location: "Old Manali Cafe Hub", elevation: "6,900 ft", photographer: "@capt_travo", cameraSettings: "Sony a7 IV - 35mm - f/1.8 - ISO 800", description: "Laughter, hot chai, and shared stories just 24 hours into the trip." },
  { id: "gal-5", url: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?q=80&w=900&auto=format&fit=crop", title: "UNESCO Floral Meadows", category: "passes", location: "Valley of Flowers", elevation: "11,811 ft", photographer: "@botanist_abroad", cameraSettings: "Nikon Z6 II - 50mm - f/2.8 - ISO 200", description: "Blue poppies, bellflowers, and rare Himalayan orchids blooming together." },
  { id: "gal-6", url: "https://images.unsplash.com/photo-1537905569824-f89f14cceb68?q=80&w=900&auto=format&fit=crop", title: "Kasol Star Glamping", category: "campsites", location: "Premium Campsite, Kasol", elevation: "5,200 ft", photographer: "@forest_nomad", cameraSettings: "Sony a7R V - 24mm - f/1.4 - ISO 3200", description: "Warm lanterns inside premium tents against the freezing alpine night." },
  { id: "gal-7", url: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=900&auto=format&fit=crop", title: "14,203 ft Mirror Pool", category: "scenic", location: "Hemkund Sahib Lake", elevation: "14,203 ft", photographer: "@spiritual_hikes", cameraSettings: "iPhone 15 Pro - 24mm - ISO 50", description: "Crystalline water reflecting glacial peaks on a windless afternoon." },
  { id: "gal-8", url: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=80&w=900&auto=format&fit=crop", title: "Confluence of Devprayag", category: "scenic", location: "Devprayag, Uttarakhand", elevation: "2,723 ft", photographer: "@capt_travo", cameraSettings: "Canon EOS R - 70mm - f/5.0 - ISO 200", description: "Where the calm Alaknanda meets the rapid Bhagirathi." },
];

export default function GallerySection() {
  const [activeTab, setActiveTab] = useState("all");
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [likedImages, setLikedImages] = useState<Record<string, boolean>>({});

  const filteredImages = activeTab === "all" ? GALLERY_IMAGES : GALLERY_IMAGES.filter((img) => img.category === activeTab);

  const handlePrev = () => {
    if (selectedImageIndex === null) return;
    setSelectedImageIndex((selectedImageIndex - 1 + filteredImages.length) % filteredImages.length);
  };

  const handleNext = () => {
    if (selectedImageIndex === null) return;
    setSelectedImageIndex((selectedImageIndex + 1) % filteredImages.length);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImageIndex === null) return;
      if (e.key === "Escape") setSelectedImageIndex(null);
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImageIndex, filteredImages.length]);

  const selected = selectedImageIndex !== null ? filteredImages[selectedImageIndex] : null;

  return (
    <section id="gallery" className="relative bg-[#090D16] py-24 px-6 border-t border-b border-white/5 overflow-hidden text-white">
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-brand-sand/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center space-x-2.5 bg-brand-sand/10 border border-brand-sand/20 px-3.5 py-1.5 rounded-full">
            <Camera className="w-3.5 h-3.5 text-brand-sand" />
            <span className="text-[10px] md:text-xs font-black tracking-[0.25em] text-brand-sand uppercase">Cosmic Lens & Moments</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-black tracking-tight text-white uppercase">Visual Chronicles</h2>
          <p className="text-sm text-gray-400 font-medium leading-relaxed">Raw glimpses of campsites, mountain curves, and friendships forged along the highway.</p>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-2.5 max-w-3xl mx-auto py-2">
          {[
            ["all", "ALL SHOTS"],
            ["campsites", "CAMPSITES"],
            ["passes", "HIGH PASSES"],
            ["scenic", "SCENIC ROADS"],
            ["group", "GROUP VIBES"],
          ].map(([id, label]) => (
            <button key={id} onClick={() => setActiveTab(id)} className={`px-5 py-2.5 text-[10px] md:text-xs font-black tracking-[0.18em] rounded-full border transition-all duration-300 ${activeTab === id ? "bg-brand-sand text-brand-charcoal border-brand-sand shadow-lg shadow-brand-sand/15" : "bg-brand-charcoal-light/40 border-white/5 text-gray-400 hover:text-white hover:border-white/15"}`}>
              {label}
            </button>
          ))}
        </div>

        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredImages.map((img, index) => (
              <motion.article
                layout
                key={img.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35 }}
                onClick={() => setSelectedImageIndex(index)}
                className="group relative rounded-2xl overflow-hidden bg-[#050B14]/40 border border-white/5 hover:border-brand-sand/30 transition-all duration-500 cursor-pointer min-h-[360px] flex flex-col justify-between"
              >
                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105" style={{ backgroundImage: `url(${img.url})` }} />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal via-brand-charcoal/20 to-black/40 opacity-90" />
                <div className="relative p-4 flex justify-between items-start">
                  <span className="bg-[#050B14]/75 backdrop-blur-md text-[9px] font-black tracking-widest text-brand-sand px-3 py-1 rounded-full border border-white/5 uppercase">{img.elevation}</span>
                  <button onClick={(e) => { e.stopPropagation(); setLikedImages((prev) => ({ ...prev, [img.id]: !prev[img.id] })); }} className="w-8 h-8 rounded-full bg-[#050B14]/75 backdrop-blur-md border border-white/5 flex items-center justify-center hover:border-red-500/30 transition-colors">
                    <Heart className={`w-3.5 h-3.5 ${likedImages[img.id] ? "text-red-500 fill-red-500" : "text-gray-400 group-hover:text-white"}`} />
                  </button>
                </div>
                <div className="relative p-5 space-y-2 mt-auto transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <div className="flex items-center space-x-1.5 text-brand-sand font-mono text-[10px] tracking-wider uppercase"><MapPin className="w-3 h-3" /><span>{img.location}</span></div>
                  <h3 className="text-base font-display font-black tracking-tight text-white group-hover:text-brand-sand transition-colors">{img.title}</h3>
                  <p className="text-[11px] text-gray-400 font-medium line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">{img.description}</p>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-8" onClick={() => setSelectedImageIndex(null)}>
            <button onClick={() => setSelectedImageIndex(null)} className="absolute top-6 right-6 z-50 w-12 h-12 rounded-full bg-brand-charcoal-light/80 border border-white/10 flex items-center justify-center text-white hover:text-brand-sand"><X className="w-5 h-5" /></button>
            <button onClick={(e) => { e.stopPropagation(); handlePrev(); }} className="absolute left-4 md:left-8 z-50 w-12 h-12 rounded-full bg-brand-charcoal-light/80 border border-white/10 flex items-center justify-center text-white hover:text-brand-sand"><ChevronLeft className="w-5 h-5" /></button>
            <button onClick={(e) => { e.stopPropagation(); handleNext(); }} className="absolute right-4 md:right-8 z-50 w-12 h-12 rounded-full bg-brand-charcoal-light/80 border border-white/10 flex items-center justify-center text-white hover:text-brand-sand"><ChevronRight className="w-5 h-5" /></button>
            <motion.div initial={{ scale: 0.95, y: 15 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 15 }} className="w-full max-w-5xl bg-brand-charcoal border border-white/10 rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row relative z-10" onClick={(e) => e.stopPropagation()}>
              <div className="w-full md:w-3/5 bg-black flex items-center justify-center relative min-h-[250px] md:min-h-[500px]"><img src={selected.url} alt={selected.title} className="w-full h-full object-contain max-h-[70vh]" /></div>
              <div className="w-full md:w-2/5 p-6 md:p-8 flex flex-col justify-between space-y-6 bg-brand-charcoal-light/60">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 text-brand-sand font-mono text-[11px] tracking-wider uppercase"><MapPin className="w-3.5 h-3.5" /><span>{selected.location}</span></div>
                  <h3 className="text-2xl font-display font-black tracking-tight text-white uppercase">{selected.title}</h3>
                  <p className="text-sm text-gray-300 font-medium leading-relaxed">{selected.description}</p>
                </div>
                <div className="p-3.5 rounded-xl bg-brand-charcoal border border-white/5 flex items-start space-x-3 text-xs text-gray-400 font-mono">
                  <Info className="w-4 h-4 text-brand-sand shrink-0 mt-0.5" />
                  <div><span className="text-[10px] text-gray-500 font-bold block">CAMERA EXIF DATA</span><span>{selected.cameraSettings}</span></div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
