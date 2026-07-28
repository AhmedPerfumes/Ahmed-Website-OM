import React from "react";
import { useLocale, useTranslations } from "next-intl";

export default function AdditionalInfo({ product, product_name, video, title }) {
  const t = useTranslations();
  const locale = useLocale();
  const isAr = locale === "ar";

  function cleanProductName(productName) {
    if (!productName) return "";
    const dynamicKey = productName.replace(/[^a-zA-Z0-9\s]/g, '') + ' Notes';
    const wordsToRemove = ['&', ' &', '& ', ' & ', 'amp', ' amp', 'amp ', ' amp ', ';', ' ;', '; ', ' ; '];
    let cleanString = dynamicKey;
    wordsToRemove.forEach(word => {
      const regex = new RegExp(word, 'gi');
      cleanString = cleanString.replace(regex, '');
    });
    return cleanString.replace(/\s+/g, ' ').trim();
  }

  const getImageUrl = (imagePath) => {
    if (!imagePath) return null;
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
      return imagePath;
    }
    return `${process.env.NEXT_PUBLIC_API_URL}storage/${imagePath}`;
  };

  // Check if we have the new tabbed/structured fragrance notes
  const hasNewNotes = product && (
    product.top_note || 
    product.heart_note || 
    product.base_note || 
    product.top_note_description || 
    product.heart_note_description || 
    product.base_note_description ||
    product.top_note_ar ||
    product.heart_note_ar ||
    product.base_note_ar ||
    product.top_note_description_ar ||
    product.heart_note_description_ar ||
    product.base_note_description_ar
  );

  const notesList = [
    {
      type: "top",
      title: isAr ? "المكونات العليا" : "Top Notes",
      note: isAr ? (product?.top_note_ar || product?.top_note) : product?.top_note,
      image: getImageUrl(product?.top_note_image),
      description: isAr ? (product?.top_note_description_ar || product?.top_note_description) : product?.top_note_description,
    },
    {
      type: "heart",
      title: isAr ? "المكونات الوسطى" : "Heart Notes",
      note: isAr ? (product?.heart_note_ar || product?.heart_note) : product?.heart_note,
      image: getImageUrl(product?.heart_note_image),
      description: isAr ? (product?.heart_note_description_ar || product?.heart_note_description) : product?.heart_note_description,
    },
    {
      type: "base",
      title: isAr ? "المكونات الأساسية" : "Bottom Notes",
      note: isAr ? (product?.base_note_ar || product?.base_note) : product?.base_note,
      image: getImageUrl(product?.base_note_image),
      description: isAr ? (product?.base_note_description_ar || product?.base_note_description) : product?.base_note_description,
    },
  ].filter(n => n.note || n.image || n.description);

  const topNote = notesList.find(n => n.type === "top");
  const heartNote = notesList.find(n => n.type === "heart");
  const baseNote = notesList.find(n => n.type === "base");

  const NoteCard = ({ noteData }) => {
    if (!noteData) return null;
    
    // Text alignment
    const textAlignment = isAr ? "text-end" : "text-start";
    
    // Parse note string into badges
    const noteChips = noteData.note ? noteData.note.split(/[,،-]/).map(n => n.trim()).filter(Boolean) : [];

    return (
      <div 
        className="note-card h-100 d-flex flex-column rounded-4 overflow-hidden position-relative"
        style={{
          background: 'linear-gradient(135deg, rgba(229, 212, 178, 0.08) 0%, rgba(0, 0, 0, 0.2) 100%)',
          border: '1px solid rgba(229, 212, 178, 0.15)',
          boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
          backdropFilter: 'blur(10px)',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease'
        }}
      >
        {noteData.image && (
          <div className="note-card-img-wrapper position-relative" style={{ height: '220px', overflow: 'hidden' }}>
            <img 
              src={noteData.image} 
              alt={noteData.title} 
              className="w-100 h-100" 
              style={{ objectFit: 'cover', objectPosition: 'center' }}
            />
            {/* Elegant overlay gradient to blend image into background */}
            <div 
              className="position-absolute bottom-0 start-0 w-100 h-50"
              style={{ background: 'linear-gradient(to top, rgba(25, 25, 25, 1) 0%, transparent 100%)' }}
            />
          </div>
        )}
        
        <div className={`p-4 d-flex flex-column flex-grow-1 ${textAlignment}`}>
          <h3 className="mb-3 text-uppercase" style={{ color: '#e5d4b2', letterSpacing: '1px', fontSize: '1.25rem', fontWeight: 600 }}>
            {noteData.title}
          </h3>
          
          {noteChips.length > 0 && (
            <div className={`d-flex flex-wrap gap-2 mb-3 ${isAr ? 'justify-content-end' : 'justify-content-start'}`}>
              {noteChips.map((chip, idx) => (
                <span 
                  key={idx} 
                  className="badge rounded-pill px-2 py-1" 
                  style={{ 
                    backgroundColor: 'rgba(229, 212, 178, 0.12)', 
                    border: '1px solid rgba(229, 212, 178, 0.3)', 
                    color: '#e5d4b2', 
                    fontSize: '0.85rem',
                    fontWeight: 500,
                  }}
                >
                  {chip}
                </span>
              ))}
            </div>
          )}
          
          {noteData.description && (
            <div 
              className="note-description text-light mt-auto" 
              style={{ 
                lineHeight: '1.7', 
                fontSize: '0.95rem',
                opacity: 0.85,
              }} 
              dangerouslySetInnerHTML={{ __html: noteData.description }} 
            />
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      {hasNewNotes && notesList.length > 0 ? (
        <div className="container py-4">
          <div className="row g-4 justify-content-center">
            {topNote && (
              <div className="col-12 col-md-6 col-lg-4">
                <NoteCard noteData={topNote} />
              </div>
            )}
            {heartNote && (
              <div className="col-12 col-md-6 col-lg-4">
                <NoteCard noteData={heartNote} />
              </div>
            )}
            {baseNote && (
              <div className="col-12 col-md-6 col-lg-4">
                <NoteCard noteData={baseNote} />
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Fallback to old behavior using JSON translation file with new styling */
        <div className="container py-4">
          <div 
            className="p-4 p-md-5 rounded-4 note-highlight-block" 
            style={{
              background: 'linear-gradient(135deg, rgba(229, 212, 178, 0.05) 0%, rgba(0, 0, 0, 0.2) 100%)',
              border: '1px solid rgba(229, 212, 178, 0.15)',
              fontSize: '1.05rem',
              lineHeight: '1.9',
              color: 'rgba(255, 255, 255, 0.9)',
              boxShadow: '0 15px 35px rgba(0,0,0,0.2)',
            }}
            dangerouslySetInnerHTML={{ __html: t.raw(cleanProductName(product_name)) }} 
          />
        </div>
      )}

      {/* Video section */}
      {(video || title) && (
        <div className="align-items-lg-center mt-5 mb-5 w-100">
          {(title) && (
            <div className="col-lg-12 d-flex align-items-center justify-content-center mb-4">
              <h2 className="mb-3 text-white text-center text-uppercase" style={{ letterSpacing: '1px', color: '#e5d4b2' }}>
                {title}
              </h2>
            </div>
          )}
          {video && (
            <div className="image-wrapper col-lg-12 d-flex justify-content-center">
              <div 
                className="rounded-4 overflow-hidden shadow-lg p-2" 
                style={{ 
                  background: 'rgba(255,255,255,0.05)', 
                  border: '1px solid rgba(229, 212, 178, 0.2)' 
                }}
              >
                <video
                  className="h-auto w-100 rounded-3"
                  style={{ maxWidth: "800px" }}
                  autoPlay
                  loop
                  muted
                  controls
                  src={`${process.env.NEXT_PUBLIC_API_URL}storage/${video}`}
                  type="video/mp4"
                />
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
