import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAllArt, deleteArt, SavedArt } from "@/utils/storage-utils";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Trash2, Edit, Plus, Diamond } from "lucide-react";

export default function GalleryPage() {
  const [artworks, setArtworks] = useState<SavedArt[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadGallery();
  }, []);

  const loadGallery = () => {
    const arts = getAllArt();
    // Sort by updated time desc
    setArtworks(arts.sort((a, b) => b.updatedAt - a.updatedAt));
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm("Are you sure you want to delete this artwork?")) {
      deleteArt(id);
      loadGallery();
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-retro">
      {/* Header */}
      <header className="border-b-4 border-muted p-4 bg-card">
        <div className="container mx-auto max-w-4xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/">
              <Button variant="ghost" size="icon" className="pixel-button">
                <ArrowLeft className="h-6 w-6" />
              </Button>
            </Link>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">MY GALLERY</h1>
          </div>
          <Link to="/editor">
             <Button className="pixel-button gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
               <Plus className="h-5 w-5" />
               <span className="hidden sm:inline">NEW CANVAS</span>
             </Button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto max-w-4xl p-4 sm:p-6">
        {artworks.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 border-4 border-dashed border-muted rounded-lg bg-card/50">
            <p className="text-xl text-muted-foreground mb-4">No artworks found</p>
            <Link to="/editor">
              <Button size="lg" className="pixel-button animate-pulse">
                START DRAWING
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
            {artworks.map((art) => (
              <div 
                key={art.id}
                onClick={() => navigate(`/editor?artId=${art.id}`)}
                className="group relative bg-card border-4 border-muted rounded-lg overflow-hidden cursor-pointer hover:border-primary hover:shadow-lg transition-all active:scale-[0.98]"
              >
                {/* Thumbnail */}
                <div className="aspect-square bg-[url('/checkerboard.png')] bg-repeat relative">
                   <div 
                     className="absolute inset-0 w-full h-full"
                     style={{
                       backgroundImage: `radial-gradient(#ccc 1px, transparent 1px)`,
                       backgroundSize: '10px 10px',
                       opacity: 0.1
                     }} 
                   />
                   <img 
                     src={art.thumbnail} 
                     alt="Pixel Art" 
                     className="w-full h-full object-contain p-2 image-pixelated"
                   />
                   {/* Minted Badge */}
                   {art.isMinted && (
                     <div className="absolute top-2 right-2 bg-purple-500 text-white p-1 rounded border-2 border-white shadow-sm" title="Minted on Blockchain">
                       <Diamond className="h-4 w-4" fill="currentColor" />
                     </div>
                   )}
                </div>

                {/* Footer Info */}
                <div className="p-3 bg-card border-t-4 border-muted flex items-center justify-between">
                  <div className="overflow-hidden">
                     <p className="font-bold text-sm truncate">{art.title || "Untitled"}</p>
                     <p className="text-[10px] text-muted-foreground">
                       {new Date(art.updatedAt).toLocaleDateString()}
                     </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-destructive hover:bg-destructive/10 -mr-1"
                    onClick={(e) => handleDelete(art.id, e)}
                    title="Delete Artwork"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                
                {/* Hover Overlay (Desktop) */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center sm:flex hidden pointer-events-none">
                   <div className="bg-background text-foreground px-3 py-1 rounded border-2 border-primary font-bold shadow-xl translate-y-4 group-hover:translate-y-0 transition-transform">
                     CONTINUE
                   </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
