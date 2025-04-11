import { featureItems } from "@/utils/featureItems";
import { IconExternalLink, IconChevronRight, IconSearch, IconX } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { Element } from "react-scroll";
import { useState } from "react";
import { sendGAEvent } from "@next/third-parties/google";
// import { mp_track_feature_zoom } from "@/lib/mixpanel";

export default function Features() {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [zoomedFeature, setZoomedFeature] = useState<number | null>(null);
  
  const categories = [
    { id: "all", name: "All Features" },
    { id: "documentation", name: "Documentation" },
    { id: "automation", name: "Automation" },
    { id: "integration", name: "Integration" }
  ];
  
  // Map features to categories for filtering
  const featureCategories = {
    "Full Repository Documentation": "documentation",
    "Git Diff Documentation Update": "documentation",
    "Pull Request Documentation": "automation",
    "Penify CLI": "integration",
    "Architecture Documentation": "documentation",
    "API Documentation": "documentation",
    "Automated Hosting": "integration",
    "Multiple Languages Support": "integration",
  };
  
  const filteredFeatures = featureItems.filter(feature => {
    // Filter by search term
    const matchesSearch = feature.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          feature.text.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filter by category
    const matchesCategory = activeTab === "all" || 
                           featureCategories[feature.title as keyof typeof featureCategories] === activeTab;
    
    return matchesSearch && matchesCategory;
  });

  const handleFeatureZoom = (index: number) => {
    setZoomedFeature(index);
    
    // Track the zoom event in GA
    sendGAEvent("feature_interaction", "feature_zoom", {
      feature_name: filteredFeatures[index].title,
    });
    
    // Track the zoom event in Mixpanel
    // mp_track_feature_zoom(filteredFeatures[index].title);
  };

  const closeZoom = () => {
    setZoomedFeature(null);
  };

  return (
    <section>
      <Element
        name="features"
        id="features"
        className="w-full py-12 overflow-hidden md:py-20 bg-gradient-to-b from-slate-900 to-bannerBg"
      >
        <div className="container mx-auto px-4">
          <div
            className="mx-auto max-w-3xl pb-12 text-center md:pb-16"
            data-aos="fade-up"
            data-aos-duration="600"
          >
            <h3 className="mb-4 inline-flex rounded-full bg-blue-900/30 px-4 py-1.5 text-sm font-semibold text-blue-400">
              Developer Tools
            </h3>

            <h1 className="mb-6 text-3xl font-bold text-white md:text-4xl">
              Documentation Automation Tools
            </h1>
            <p className="text-base text-slate-300 md:text-lg max-w-2xl mx-auto">
              Automate code, API, and architecture documentation throughout your 
              development workflow. Save time and maintain accuracy across your projects.
            </p>
          </div>

          {/* Search and filter */}
          <div className="mb-12 flex flex-col md:flex-row items-center justify-between gap-6" 
               data-aos="fade-up" data-aos-delay="200">
            <div className="relative w-full md:w-1/3">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <IconSearch className="w-5 h-5 text-slate-400" />
              </div>
              <input 
                type="search"
                className="block w-full p-3 pl-10 text-sm border rounded-lg bg-slate-800/50 border-slate-700 text-white focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search features..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setActiveTab(category.id)}
                  className={`px-4 py-2 text-sm font-medium rounded-full transition-all ${
                    activeTab === category.id 
                      ? "bg-blue-600 text-white" 
                      : "bg-slate-800/70 text-slate-300 hover:bg-slate-700"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Feature cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredFeatures.map((feature, index) => (
              <div
                key={`feature-item-${index}`}
                className="relative group bg-slate-800/40 backdrop-blur-sm rounded-xl overflow-hidden border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 flex flex-col cursor-pointer"
                data-aos="fade-up"
                data-aos-delay={(100 + (index * 50))+""}
                onClick={() => handleFeatureZoom(index)}
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={feature.img}
                    alt={`${feature.title} illustration`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-60"></div>
                </div>
                
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="text-xl font-bold text-white">{feature.title}</h2>
                    {feature.href && (
                      <Link
                        href={feature.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-600/20 text-blue-400 hover:bg-blue-600 hover:text-white transition-colors z-10"
                        aria-label="View demo"
                        onClick={(e) => e.stopPropagation()} // Prevent triggering the card click
                      >
                        <IconExternalLink width={16} />
                      </Link>
                    )}
                  </div>
                  
                  <p className="text-slate-300 mb-4">{feature.text}</p>
                  
                  <div className="mt-auto">
                    <h3 className="text-sm font-semibold text-blue-400 mb-2">Key Benefits:</h3>
                    <ul className="space-y-2">
                      {feature.children.slice(0, 2).map((child, childIndex) => (
                        <li
                          className="flex items-start gap-2 text-sm text-slate-300"
                          key={`feature-child-${childIndex}`}
                        >
                          <IconChevronRight className="flex-shrink-0 w-4 h-4 mt-0.5 text-blue-500" />
                          <span>{child}</span>
                        </li>
                      ))}
                    </ul>
                    
                    {feature.children.length > 2 && (
                      <div className="pt-3 mt-2 border-t border-slate-700/50">
                        <div className="text-sm text-blue-400 flex items-center">
                          +{feature.children.length - 2} more benefits
                          <IconChevronRight className="w-4 h-4 ml-1" />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {filteredFeatures.length === 0 && (
            <div className="text-center py-12 text-slate-400">
              No features match your current search. Try a different term or category.
            </div>
          )}
        </div>
      </Element>

      {/* Feature Zoom Modal */}
      {zoomedFeature !== null && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm" onClick={closeZoom}>
          <div 
            className="bg-slate-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
          >
            <div className="relative h-72 sm:h-96 overflow-hidden">
              <Image
                src={filteredFeatures[zoomedFeature].img}
                alt={`${filteredFeatures[zoomedFeature].title} illustration`}
                fill
                className="object-cover"
                sizes="(max-width: 1536px) 100vw, 1536px"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-70"></div>
              <button 
                className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors"
                onClick={closeZoom}
              >
                <IconX size={24} />
              </button>
            </div>
            
            <div className="p-6 sm:p-8">
              <div className="flex items-center justify-between flex-wrap gap-y-2 mb-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-white mr-4">
                  {filteredFeatures[zoomedFeature].title}
                </h2>
                
                {filteredFeatures[zoomedFeature].href && (
                  <Link
                    href={filteredFeatures[zoomedFeature].href || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 py-2 px-4 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                  >
                    View Demo <IconExternalLink width={18} />
                  </Link>
                )}
              </div>
              
              <p className="text-lg text-slate-200 mb-8">
                {filteredFeatures[zoomedFeature].text}
              </p>
              
              <div>
                <h3 className="text-lg font-semibold text-blue-400 mb-4">All Benefits:</h3>
                <ul className="space-y-3 mb-6">
                  {filteredFeatures[zoomedFeature].children.map((benefit, idx) => (
                    <li
                      key={`zoomed-benefit-${idx}`}
                      className="flex items-start gap-3 text-slate-300"
                    >
                      <IconChevronRight className="flex-shrink-0 w-5 h-5 mt-0.5 text-blue-500" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
