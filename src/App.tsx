import React, { useState, useEffect } from 'react';
import { STYLE_LIBRARY, type SubStyle } from './lib/prompt-data';
import { Copy, Check, Sparkles, Terminal, Layout } from "lucide-react";

const App = () => {
  // --- ESTADOS ---
  const [subject, setSubject] = useState('');
  const [action, setAction] = useState('');
  const [category, setCategory] = useState('Anime');
  const [subStyle, setSubStyle] = useState<SubStyle | null>(null);
  const [negativePrompt, setNegativePrompt] = useState('');
  const [finalPrompt, setFinalPrompt] = useState('');
  const [copied, setCopied] = useState(false);

  // --- LÓGICA DE INGENIERÍA DE PROMPTS ---
  useEffect(() => {
    if (!subject) {
      setFinalPrompt("");
      return;
    }

    // 1. Definición de la estructura base (Capa de Sujeto)
    let prompt = `A professional and highly detailed portrayal of ${subject}`;

    // 2. Capa de Acción y Entorno
    if (action) {
      prompt += `, ${action.toLowerCase()}, with a cinematic and well-balanced composition`;
    }

    // 3. Capa de Estilo (Prioridad al Sub-estilo)
    if (subStyle) {
      prompt += `. Artistic direction: ${subStyle.tokens}`;
    } else {
      prompt += `. Aesthetic: ${category} style`;
    }

    // 4. Capa Técnica (CVA & Quality)
    prompt += `. Technical specs: shot on 35mm lens, f/1.8, sharp focus, hyper-realistic textures, ray tracing, 8k resolution, masterpiece quality`;

    // 5. Capa Negativa (Si existe)
    if (negativePrompt.trim()) {
      prompt += ` --no ${negativePrompt}`;
    }

    setFinalPrompt(prompt);
    setCopied(false);
  }, [subject, action, category, subStyle, negativePrompt]);

  // --- HANDLERS ---
  const handleCopy = () => {
    if (!finalPrompt) return;
    navigator.clipboard.writeText(finalPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // --- ESTILOS INLINE (LOOK MODERNO/BORDERED) ---
  const styles: Record<string, React.CSSProperties> = {
    wrapper: { minHeight: '100vh', backgroundColor: '#F4F4F5', padding: '40px 20px', fontFamily: 'Inter, system-ui, sans-serif' },
    container: { maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 420px', gap: '24px' },
    card: { background: '#FFF', border: '2px solid #000', borderRadius: '16px', padding: '32px', display: 'flex', flexDirection: 'column', gap: '24px' },
    sidebar: { backgroundColor: '#000', color: '#FFF', border: '2px solid #000', borderRadius: '16px', padding: '32px', height: 'fit-content', position: 'sticky', top: '40px' },
    label: { display: 'block', fontWeight: '800', fontSize: '11px', letterSpacing: '0.05em', color: '#000', marginBottom: '8px' },
    input: { width: '100%', padding: '14px', border: '2px solid #000', borderRadius: '8px', fontSize: '15px', outline: 'none' },
    gridButtons: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' },
    pillButton: { padding: '8px 16px', borderRadius: '20px', border: '2px solid #000', cursor: 'pointer', fontWeight: '700', fontSize: '12px', transition: '0.2s' }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        
        {/* COLUMNA IZQUIERDA: CONFIGURADOR */}
        <div style={styles.card}>
          <header style={{ borderBottom: '2px solid #F0F0F0', paddingBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#000' }}>
              <Terminal size={20} />
              <h1 style={{ fontSize: '24px', fontWeight: '900', margin: 0 }}>IMAGIF <span style={{ color: '#666' }}>AI</span></h1>
            </div>
            <p style={{ color: '#666', fontSize: '14px', marginTop: '4px' }}>Advanced prompt engineering for creative professionals.</p>
          </header>

          {/* PASO 1: SUJETO */}
          <div>
            <label style={styles.label}>01. THE MAIN SUBJECT</label>
            <input 
              style={styles.input} 
              placeholder="e.g. A futuristic samurai in a rainy neo-tokyo" 
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>

          {/* PASO 2: ACCIÓN */}
          <div>
            <label style={styles.label}>02. ACTION & ENVIRONMENT</label>
            <textarea 
              style={{ ...styles.input, minHeight: '80px', resize: 'none' }} 
              placeholder="e.g. Looking at the camera with intense eyes, holding a glowing katana"
              onChange={(e) => setAction(e.target.value)}
            />
          </div>

          {/* PASO 3: ESTILO PADRE */}
          <div>
            <label style={styles.label}>03. ARTISTIC CATEGORY</label>
            <div style={styles.gridButtons}>
              {Object.keys(STYLE_LIBRARY).map((key) => (
                <button 
                  key={key}
                  onClick={() => { setCategory(key); setSubStyle(null); }}
                  style={{
                    ...styles.input, padding: '12px', cursor: 'pointer',
                    backgroundColor: category === key ? '#000' : '#FFF',
                    color: category === key ? '#FFF' : '#000',
                    fontWeight: '700'
                  }}
                >
                  {key}
                </button>
              ))}
            </div>
          </div>

          {/* PASO 4: SUB-ESTILOS DINÁMICOS */}
          {STYLE_LIBRARY[category] && (
            <div style={{ backgroundColor: '#FAFAFA', padding: '20px', borderRadius: '12px', border: '2px dashed #DDD' }}>
              <label style={{ ...styles.label, color: '#888' }}>SELECT {category.toUpperCase()} AESTHETIC</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '12px' }}>
                {STYLE_LIBRARY[category].subStyles.map((sub) => (
                  <button 
                    key={sub.id}
                    onClick={() => setSubStyle(sub)}
                    style={{
                      ...styles.pillButton,
                      backgroundColor: subStyle?.id === sub.id ? '#000' : '#FFF',
                      color: subStyle?.id === sub.id ? '#FFF' : '#000'
                    }}
                  >
                    {sub.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* PASO 5: NEGATIVE PROMPT */}
          <div>
            <label style={styles.label}>04. EXCLUDE FROM IMAGE (NEGATIVE)</label>
            <input 
              style={{ ...styles.input, border: '2px solid #EEE', backgroundColor: '#FAFAFA' }} 
              placeholder="e.g. text, watermark, extra limbs, blur" 
              onChange={(e) => setNegativePrompt(e.target.value)}
            />
          </div>
        </div>

        {/* COLUMNA DERECHA: RESULTADO (OUTPUT) */}
        <div style={styles.sidebar}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <span style={{ fontSize: '10px', fontWeight: '900', color: '#555', letterSpacing: '0.1em' }}>ENGINEERED RESULT</span>
            <button 
              onClick={handleCopy}
              style={{ 
                background: copied ? '#22C55E' : '#222', color: '#FFF', border: 'none', 
                padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', 
                fontSize: '11px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '6px',
                transition: '0.2s'
              }}
            >
              {copied ? <Check size={14} /> : <Copy size={14} />} {copied ? 'COPIED!' : 'COPY'}
            </button>
          </div>

          <div style={{ 
            fontSize: '16px', lineHeight: '1.7', color: subject ? '#FFF' : '#333', 
            minHeight: '200px', fontStyle: subject ? 'normal' : 'italic',
            wordBreak: 'break-word'
          }}>
            {subject ? finalPrompt : "Waiting for subject input to start engineering..."}
          </div>

          <div style={{ marginTop: '32px', paddingTop: '24px', borderTop: '1px solid #222', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#888' }}>
              <Sparkles size={14} color="#EAB308" />
              <span>Optimized for MJ v6, DALL-E 3 & SDXL</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#888' }}>
              <Layout size={14} />
              <span>CVA Architecture applied</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default App;