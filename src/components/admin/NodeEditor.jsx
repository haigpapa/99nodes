import { useState, useRef } from 'react';
import { CATEGORIES, NODES, LONG_DESCRIPTIONS } from '../../data/nodes';

export default function NodeEditor({ node, onBack, onSaved }) {
    const [form, setForm] = useState({ ...node });
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [saveStatus, setSaveStatus] = useState(null); // 'ok' | 'error' | null
    const [isDragOver, setIsDragOver] = useState(false);
    const fileInputRef = useRef(null);

    // ── Project page content ─────────────────────────────────────────────
    const existingContent = LONG_DESCRIPTIONS[node.id] || {};
    const [projectContent, setProjectContent] = useState({
        banner: existingContent.banner || '',
        media: existingContent.media || [],
        longDescription: existingContent.longDescription || '',
        details: existingContent.details || [],
        sections: existingContent.sections || [],
    });
    const [savingProject, setSavingProject] = useState(false);
    const [projectSaveStatus, setProjectSaveStatus] = useState(null);
    const [uploadingBanner, setUploadingBanner] = useState(false);
    const [uploadingGallery, setUploadingGallery] = useState(false);
    const [bannerDragOver, setBannerDragOver] = useState(false);
    const [galleryDragOver, setGalleryDragOver] = useState(false);
    const bannerInputRef = useRef(null);
    const galleryInputRef = useRef(null);

    const setPC = (field, value) => setProjectContent(pc => ({ ...pc, [field]: value }));

    const set = (field, value) => setForm(f => ({ ...f, [field]: value }));

    // ── Image upload (drag & drop or click) ─────────────────────────────────
    const uploadFile = async (file) => {
        if (!file) return;
        const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif'];
        if (!allowed.includes(file.type)) {
            alert('Only JPG, PNG, WebP, GIF, or AVIF images are allowed.');
            return;
        }
        setUploading(true);
        try {
            const formData = new FormData();
            formData.append('image', file, file.name);
            const res = await fetch('/api/admin/upload-image', { method: 'POST', body: formData });
            const data = await res.json();
            if (data.ok) {
                set('image', data.url);
            } else {
                alert('Upload failed: ' + data.error);
            }
        } catch (err) {
            alert('Upload error: ' + err.message);
        } finally {
            setUploading(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragOver(false);
        const file = e.dataTransfer.files[0];
        if (file) uploadFile(file);
    };

    const handleFileInput = (e) => {
        const file = e.target.files[0];
        if (file) uploadFile(file);
    };

    // ── Project media upload ─────────────────────────────────────────────
    const uploadProjectMedia = async (files, target) => {
        if (!files || files.length === 0) return;
        const setLoading = target === 'banner' ? setUploadingBanner : setUploadingGallery;
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('nodeId', form.id);
            for (const file of files) {
                formData.append('files', file, file.name);
            }
            const res = await fetch('/api/admin/upload-project-media', { method: 'POST', body: formData });
            const data = await res.json();
            if (data.ok && data.urls.length > 0) {
                if (target === 'banner') {
                    setPC('banner', data.urls[0]);
                } else {
                    setPC('media', [...projectContent.media, ...data.urls.map(src => ({ src, caption: '' }))]);
                }
            } else {
                alert('Upload failed: ' + (data.error || 'No files uploaded'));
            }
        } catch (err) {
            alert('Upload error: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleBannerDrop = (e) => { e.preventDefault(); setBannerDragOver(false); uploadProjectMedia([e.dataTransfer.files[0]], 'banner'); };
    const handleGalleryDrop = (e) => { e.preventDefault(); setGalleryDragOver(false); uploadProjectMedia(Array.from(e.dataTransfer.files), 'gallery'); };

    // ── Save node ────────────────────────────────────────────────────────────
    const handleSave = async () => {
        setSaving(true);
        setSaveStatus(null);
        try {
            const res = await fetch('/api/admin/save-node', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ node: form }),
            });
            const data = await res.json();
            if (data.ok) {
                setSaveStatus('ok');
                setTimeout(() => onSaved(form.id), 800);
            } else {
                setSaveStatus('error');
                alert('Save failed: ' + data.error);
            }
        } catch (err) {
            setSaveStatus('error');
            alert('Save error: ' + err.message);
        } finally {
            setSaving(false);
        }
    };

    // ── Save project content ─────────────────────────────────────────────
    const handleSaveProject = async () => {
        setSavingProject(true);
        setProjectSaveStatus(null);
        try {
            const res = await fetch('/api/admin/save-project-content', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nodeId: form.id, content: projectContent }),
            });
            const data = await res.json();
            if (data.ok) {
                setProjectSaveStatus('ok');
                setTimeout(() => setProjectSaveStatus(null), 2000);
            } else {
                setProjectSaveStatus('error');
                alert('Save failed: ' + data.error);
            }
        } catch (err) {
            setProjectSaveStatus('error');
            alert('Save error: ' + err.message);
        } finally {
            setSavingProject(false);
        }
    };

    const toggleCategory = (key) => {
        const cats = form.categories.includes(key)
            ? form.categories.filter(c => c !== key)
            : [...form.categories, key];
        set('categories', cats);
    };

    const allNodeIds = NODES.map(n => n.id).filter(id => id !== form.id);

    // ── Detail/Section editors ───────────────────────────────────────────
    const addDetail = () => setPC('details', [...projectContent.details, { label: '', value: '' }]);
    const removeDetail = (i) => setPC('details', projectContent.details.filter((_, idx) => idx !== i));
    const updateDetail = (i, field, val) => {
        const d = [...projectContent.details];
        d[i] = { ...d[i], [field]: val };
        setPC('details', d);
    };
    const addSection = () => setPC('sections', [...projectContent.sections, { title: '', body: '' }]);
    const removeSection = (i) => setPC('sections', projectContent.sections.filter((_, idx) => idx !== i));
    const updateSection = (i, field, val) => {
        const s = [...projectContent.sections];
        s[i] = { ...s[i], [field]: val };
        setPC('sections', s);
    };
    const removeMedia = (i) => setPC('media', projectContent.media.filter((_, idx) => idx !== i));
    const updateCaption = (i, val) => {
        const m = [...projectContent.media];
        m[i] = { ...m[i], caption: val };
        setPC('media', m);
    };

    return (
        <div
            className="min-h-screen bg-black text-white"
            style={{ fontFamily: '"DM Sans", sans-serif' }}
        >
            {/* Sticky header */}
            <div className="sticky top-0 bg-black border-b border-white/10 z-10">
                <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
                    <button
                        onClick={onBack}
                        className="text-white/30 hover:text-white/70 transition-colors text-sm"
                    >
                        ← Back
                    </button>

                    <div className="text-white/50 text-xs tracking-[0.2em] uppercase truncate">
                        Editing: {form.title || form.id}
                    </div>

                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className={`px-6 py-2 text-[10px] tracking-[0.2em] uppercase transition-all border ${saveStatus === 'ok'
                                ? 'bg-white text-black border-white'
                                : saving
                                    ? 'border-white/20 text-white/30'
                                    : 'bg-white text-black border-white hover:bg-white/90'
                            }`}
                    >
                        {saving ? 'Saving…' : saveStatus === 'ok' ? 'Saved ✓' : 'Save Node'}
                    </button>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-6 py-10 grid md:grid-cols-[1fr_1.2fr] gap-10">

                {/* ── LEFT: Image upload ─────────────────────────────────── */}
                <div className="space-y-4">
                    <label className="text-white/25 text-[9px] tracking-[0.25em] uppercase block">
                        Constellation Thumbnail
                    </label>

                    {/* Drop zone */}
                    <div
                        onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
                        onDragLeave={() => setIsDragOver(false)}
                        onDrop={handleDrop}
                        onClick={() => fileInputRef.current?.click()}
                        className={`relative border-2 border-dashed cursor-pointer transition-all overflow-hidden ${isDragOver
                                ? 'border-white bg-white/5'
                                : 'border-white/15 hover:border-white/35'
                            }`}
                        style={{ minHeight: '180px' }}
                    >
                        {form.image ? (
                            <img
                                src={form.image}
                                alt="preview"
                                className="w-full h-auto object-contain"
                            />
                        ) : (
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-white/20" style={{ minHeight: '180px' }}>
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                                    <rect x="3" y="3" width="18" height="18" rx="0" />
                                    <circle cx="8.5" cy="8.5" r="1.5" />
                                    <polyline points="21 15 16 10 5 21" />
                                </svg>
                                <p className="mt-3 text-[10px] tracking-widest uppercase">Drop image here</p>
                            </div>
                        )}

                        {/* Overlay on hover */}
                        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                            {uploading ? (
                                <p className="text-white text-xs tracking-widest uppercase">Uploading…</p>
                            ) : (
                                <>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
                                        <polyline points="16 16 12 12 8 16" />
                                        <line x1="12" y1="12" x2="12" y2="21" />
                                        <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
                                    </svg>
                                    <p className="mt-2 text-white text-[10px] tracking-widest uppercase">
                                        {form.image ? 'Replace image' : 'Upload image'}
                                    </p>
                                    <p className="text-white/40 text-[9px] mt-1">or drag & drop</p>
                                </>
                            )}
                        </div>

                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleFileInput}
                            className="hidden"
                        />
                    </div>

                    {/* Current image path */}
                    <div>
                        <label className="text-white/25 text-[9px] tracking-[0.25em] uppercase block mb-1.5">
                            Image URL (or paste external URL)
                        </label>
                        <input
                            type="text"
                            value={form.image}
                            onChange={e => set('image', e.target.value)}
                            placeholder="https://... or /images/filename.jpg"
                            className="w-full bg-white/5 border border-white/10 px-3 py-2 text-white/60 text-xs outline-none focus:border-white/30 transition-colors placeholder-white/15"
                            style={{ fontFamily: '"DM Sans", sans-serif' }}
                        />
                    </div>

                    {/* Tier */}
                    <div>
                        <label className="text-white/25 text-[9px] tracking-[0.25em] uppercase block mb-1.5">
                            Tier (1 = large/prominent, 2 = medium, 3 = small)
                        </label>
                        <div className="flex gap-2">
                            {[1, 2, 3].map(t => (
                                <button
                                    key={t}
                                    onClick={() => set('tier', t)}
                                    className={`flex-1 py-2 text-xs border transition-all ${form.tier === t
                                            ? 'bg-white text-black border-white'
                                            : 'border-white/15 text-white/40 hover:border-white/40'
                                        }`}
                                >
                                    Tier {t}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Temporal */}
                    <div>
                        <label className="text-white/25 text-[9px] tracking-[0.25em] uppercase block mb-1.5">
                            Temporal
                        </label>
                        <div className="flex gap-2">
                            {['historical', 'ongoing', 'speculative'].map(t => (
                                <button
                                    key={t}
                                    onClick={() => set('temporal', t)}
                                    className={`flex-1 py-2 text-[9px] tracking-widest uppercase border transition-all ${form.temporal === t
                                            ? 'bg-white text-black border-white'
                                            : 'border-white/15 text-white/40 hover:border-white/40'
                                        }`}
                                >
                                    {t}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ── RIGHT: Text fields ─────────────────────────────────── */}
                <div className="space-y-6">

                    <Field label="Title">
                        <input
                            type="text"
                            value={form.title}
                            onChange={e => set('title', e.target.value)}
                            className={INPUT}
                            style={{ fontFamily: '"DM Sans", sans-serif' }}
                        />
                    </Field>

                    <Field label="Subtitle (e.g. Album · 2015)">
                        <input
                            type="text"
                            value={form.subtitle}
                            onChange={e => set('subtitle', e.target.value)}
                            className={INPUT}
                            style={{ fontFamily: '"DM Sans", sans-serif' }}
                        />
                    </Field>

                    <Field label="Year">
                        <input
                            type="text"
                            value={form.year}
                            onChange={e => set('year', e.target.value)}
                            className={INPUT}
                            style={{ fontFamily: '"DM Sans", sans-serif' }}
                        />
                    </Field>

                    <Field label="Description (shown in node card)">
                        <textarea
                            value={form.description}
                            onChange={e => set('description', e.target.value)}
                            rows={4}
                            className={INPUT + ' resize-none'}
                            style={{ fontFamily: '"DM Sans", sans-serif' }}
                        />
                    </Field>

                    {/* Categories */}
                    <div>
                        <label className="text-white/25 text-[9px] tracking-[0.25em] uppercase block mb-2">
                            Categories
                        </label>
                        <div className="flex gap-2 flex-wrap">
                            {CATEGORIES.map(cat => (
                                <button
                                    key={cat.key}
                                    onClick={() => toggleCategory(cat.key)}
                                    className={`px-3 py-1 text-[10px] tracking-widest uppercase border transition-all ${form.categories.includes(cat.key)
                                            ? 'bg-white text-black border-white'
                                            : 'border-white/15 text-white/40 hover:border-white/40'
                                        }`}
                                >
                                    {cat.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Connections */}
                    <div>
                        <label className="text-white/25 text-[9px] tracking-[0.25em] uppercase block mb-2">
                            Connections ({form.connections.length} linked)
                        </label>
                        <ConnectionsEditor
                            connections={form.connections}
                            allIds={allNodeIds}
                            onChange={v => set('connections', v)}
                        />
                    </div>

                    {/* ID (read-only) */}
                    <div>
                        <label className="text-white/15 text-[9px] tracking-[0.25em] uppercase block mb-1.5">
                            Node ID (read-only)
                        </label>
                        <div className="px-3 py-2 bg-white/3 border border-white/8 text-white/20 text-xs font-mono">
                            {form.id}
                        </div>
                    </div>

                </div>
            </div>

            {/* ══════════════════════════════════════════════════════════════════
                    PROJECT PAGE CONTENT
               ══════════════════════════════════════════════════════════════════ */}
            <div className="max-w-4xl mx-auto px-6 pb-10">
                <div className="border-t border-white/10 pt-10">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-white/40 text-[10px] tracking-[0.3em] uppercase">
                            Project Page Content
                        </h2>
                        <button
                            onClick={handleSaveProject}
                            disabled={savingProject}
                            className={`px-6 py-2 text-[10px] tracking-[0.2em] uppercase transition-all border ${projectSaveStatus === 'ok'
                                    ? 'bg-white text-black border-white'
                                    : savingProject
                                        ? 'border-white/20 text-white/30'
                                        : 'border-white/25 text-white/50 hover:bg-white hover:text-black hover:border-white'
                                }`}
                        >
                            {savingProject ? 'Saving…' : projectSaveStatus === 'ok' ? 'Saved ✓' : 'Save Project Content'}
                        </button>
                    </div>

                    <div className="grid md:grid-cols-2 gap-10">

                        {/* ── Banner ──────────────────────────────────────── */}
                        <div className="space-y-3">
                            <label className="text-white/25 text-[9px] tracking-[0.25em] uppercase block">
                                Project Banner (hero image)
                            </label>
                            <div
                                onDragOver={(e) => { e.preventDefault(); setBannerDragOver(true); }}
                                onDragLeave={() => setBannerDragOver(false)}
                                onDrop={handleBannerDrop}
                                onClick={() => bannerInputRef.current?.click()}
                                className={`relative aspect-[21/9] border-2 border-dashed cursor-pointer transition-all overflow-hidden ${bannerDragOver ? 'border-white bg-white/5' : 'border-white/15 hover:border-white/35'
                                    }`}
                            >
                                {projectContent.banner ? (
                                    <img src={projectContent.banner} alt="banner" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white/20">
                                        <p className="text-[10px] tracking-widest uppercase">Drop banner here</p>
                                        <p className="text-[8px] text-white/10 mt-1">21:9 recommended</p>
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                                    <p className="text-white text-[10px] tracking-widest uppercase">
                                        {uploadingBanner ? 'Uploading…' : projectContent.banner ? 'Replace banner' : 'Upload banner'}
                                    </p>
                                </div>
                                <input ref={bannerInputRef} type="file" accept="image/*" onChange={e => { if (e.target.files[0]) uploadProjectMedia([e.target.files[0]], 'banner'); }} className="hidden" />
                            </div>
                            <input
                                type="text"
                                value={projectContent.banner}
                                onChange={e => setPC('banner', e.target.value)}
                                placeholder="/images/node-id/banner.jpg"
                                className={INPUT + ' text-xs'}
                                style={{ fontFamily: '"DM Sans", sans-serif' }}
                            />
                        </div>

                        {/* ── Gallery ─────────────────────────────────────── */}
                        <div className="space-y-3">
                            <label className="text-white/25 text-[9px] tracking-[0.25em] uppercase block">
                                Gallery Media ({projectContent.media.length} items)
                            </label>
                            <div
                                onDragOver={(e) => { e.preventDefault(); setGalleryDragOver(true); }}
                                onDragLeave={() => setGalleryDragOver(false)}
                                onDrop={handleGalleryDrop}
                                onClick={() => galleryInputRef.current?.click()}
                                className={`relative min-h-[100px] border-2 border-dashed cursor-pointer transition-all overflow-hidden p-2 ${galleryDragOver ? 'border-white bg-white/5' : 'border-white/15 hover:border-white/35'
                                    }`}
                            >
                                {projectContent.media.length > 0 ? (
                                    <div className="grid grid-cols-3 gap-1.5">
                                        {projectContent.media.map((m, i) => (
                                            <div key={i} className="relative group aspect-square bg-white/5 overflow-hidden">
                                                <img src={m.src} alt="" className="w-full h-full object-cover opacity-70" />
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); removeMedia(i); }}
                                                    className="absolute top-1 right-1 w-5 h-5 bg-black/70 text-white/50 hover:text-white text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                                >
                                                    ×
                                                </button>
                                            </div>
                                        ))}
                                        <div className="aspect-square border border-dashed border-white/10 flex items-center justify-center text-white/15 text-lg">
                                            +
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center text-white/20 py-6">
                                        <p className="text-[10px] tracking-widest uppercase">Drop photos here</p>
                                        <p className="text-[8px] text-white/10 mt-1">multiple files supported</p>
                                    </div>
                                )}
                                {uploadingGallery && (
                                    <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                                        <p className="text-white text-[10px] tracking-widest uppercase">Uploading…</p>
                                    </div>
                                )}
                                <input ref={galleryInputRef} type="file" accept="image/*,video/*" multiple onChange={e => { if (e.target.files.length) uploadProjectMedia(Array.from(e.target.files), 'gallery'); }} className="hidden" />
                            </div>

                            {/* Caption editing */}
                            {projectContent.media.length > 0 && (
                                <div className="space-y-1.5 mt-2">
                                    {projectContent.media.map((m, i) => (
                                        <div key={i} className="flex items-center gap-2">
                                            <img src={m.src} alt="" className="w-8 h-8 object-cover flex-shrink-0 bg-white/5" />
                                            <input
                                                type="text"
                                                value={m.caption || ''}
                                                onChange={e => updateCaption(i, e.target.value)}
                                                placeholder="Caption (optional)"
                                                className="flex-1 bg-white/5 border border-white/10 px-2 py-1 text-white/50 text-[10px] outline-none focus:border-white/30 placeholder-white/15"
                                                onClick={e => e.stopPropagation()}
                                            />
                                            <button
                                                onClick={() => removeMedia(i)}
                                                className="text-white/20 hover:text-white/60 text-xs"
                                            >
                                                ×
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* ── Long Description ──────────────────────────────── */}
                    <div className="mt-8">
                        <Field label="Long Description (project page)">
                            <textarea
                                value={projectContent.longDescription}
                                onChange={e => setPC('longDescription', e.target.value)}
                                rows={6}
                                className={INPUT + ' resize-none'}
                                style={{ fontFamily: '"DM Sans", sans-serif' }}
                            />
                        </Field>
                    </div>

                    {/* ── Details (key/value pairs) ─────────────────────── */}
                    <div className="mt-8">
                        <div className="flex items-center justify-between mb-3">
                            <label className="text-white/25 text-[9px] tracking-[0.25em] uppercase">
                                Details ({projectContent.details.length})
                            </label>
                            <button onClick={addDetail} className="text-white/25 hover:text-white/60 text-[10px] tracking-widest uppercase transition-colors">
                                + Add
                            </button>
                        </div>
                        <div className="space-y-2">
                            {projectContent.details.map((d, i) => (
                                <div key={i} className="flex gap-2 items-center">
                                    <input
                                        type="text"
                                        value={d.label}
                                        onChange={e => updateDetail(i, 'label', e.target.value)}
                                        placeholder="Label"
                                        className="w-1/3 bg-white/5 border border-white/10 px-2 py-1.5 text-white/60 text-xs outline-none focus:border-white/30 placeholder-white/15"
                                    />
                                    <input
                                        type="text"
                                        value={d.value}
                                        onChange={e => updateDetail(i, 'value', e.target.value)}
                                        placeholder="Value"
                                        className="flex-1 bg-white/5 border border-white/10 px-2 py-1.5 text-white/60 text-xs outline-none focus:border-white/30 placeholder-white/15"
                                    />
                                    <button onClick={() => removeDetail(i)} className="text-white/20 hover:text-white/60 text-sm transition-colors">×</button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* ── Sections (title + body) ──────────────────────── */}
                    <div className="mt-8">
                        <div className="flex items-center justify-between mb-3">
                            <label className="text-white/25 text-[9px] tracking-[0.25em] uppercase">
                                Sections ({projectContent.sections.length})
                            </label>
                            <button onClick={addSection} className="text-white/25 hover:text-white/60 text-[10px] tracking-widest uppercase transition-colors">
                                + Add
                            </button>
                        </div>
                        <div className="space-y-4">
                            {projectContent.sections.map((s, i) => (
                                <div key={i} className="border border-white/8 p-3 space-y-2">
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="text"
                                            value={s.title}
                                            onChange={e => updateSection(i, 'title', e.target.value)}
                                            placeholder="Section title"
                                            className="flex-1 bg-white/5 border border-white/10 px-2 py-1.5 text-white/60 text-xs outline-none focus:border-white/30 placeholder-white/15"
                                        />
                                        <button onClick={() => removeSection(i)} className="text-white/20 hover:text-white/60 text-sm transition-colors">×</button>
                                    </div>
                                    <textarea
                                        value={s.body}
                                        onChange={e => updateSection(i, 'body', e.target.value)}
                                        rows={3}
                                        placeholder="Section body text"
                                        className="w-full bg-white/5 border border-white/10 px-2 py-1.5 text-white/60 text-xs outline-none focus:border-white/30 resize-none placeholder-white/15"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Project save button (bottom) */}
                    <div className="mt-8 flex justify-end">
                        <button
                            onClick={handleSaveProject}
                            disabled={savingProject}
                            className={`px-10 py-3 text-[10px] tracking-[0.2em] uppercase transition-all border ${projectSaveStatus === 'ok'
                                    ? 'bg-white text-black border-white'
                                    : savingProject
                                        ? 'border-white/20 text-white/30'
                                        : 'border-white/25 text-white/50 hover:bg-white hover:text-black hover:border-white'
                                }`}
                        >
                            {savingProject ? 'Saving…' : projectSaveStatus === 'ok' ? 'Saved ✓' : 'Save Project Content'}
                        </button>
                    </div>
                </div>
            </div>

            {/* Bottom save bar (node data) */}
            <div className="sticky bottom-0 bg-black border-t border-white/10 px-6 py-4 flex justify-end">
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className={`px-10 py-3 text-[10px] tracking-[0.2em] uppercase transition-all border ${saveStatus === 'ok'
                            ? 'bg-white text-black border-white'
                            : saving
                                ? 'border-white/20 text-white/30'
                                : 'bg-white text-black border-white hover:bg-white/90'
                        }`}
                >
                    {saving ? 'Saving…' : saveStatus === 'ok' ? 'Saved ✓' : 'Save Node'}
                </button>
            </div>
        </div>
    );
}

// ── Shared styles ─────────────────────────────────────────────────────────────
const INPUT = 'w-full bg-white/5 border border-white/10 px-3 py-2 text-white/80 text-sm outline-none focus:border-white/35 transition-colors placeholder-white/15';

function Field({ label, children }) {
    return (
        <div>
            <label className="text-white/25 text-[9px] tracking-[0.25em] uppercase block mb-1.5">
                {label}
            </label>
            {children}
        </div>
    );
}

// ── Connections multi-select ──────────────────────────────────────────────────
function ConnectionsEditor({ connections, allIds, onChange }) {
    const [search, setSearch] = useState('');
    const [open, setOpen] = useState(false);

    const NODES_MAP = Object.fromEntries(NODES.map(n => [n.id, n.title]));

    const toggle = (id) => {
        if (connections.includes(id)) {
            onChange(connections.filter(c => c !== id));
        } else {
            onChange([...connections, id]);
        }
    };

    const filtered = allIds.filter(id => {
        const title = NODES_MAP[id] || id;
        return !search || title.toLowerCase().includes(search.toLowerCase()) || id.includes(search.toLowerCase());
    });

    return (
        <div className="space-y-2">
            {/* Current connections as removable pills */}
            <div className="flex flex-wrap gap-1.5 min-h-[28px]">
                {connections.length === 0 && (
                    <span className="text-white/20 text-[10px]">No connections yet</span>
                )}
                {connections.map(id => (
                    <span
                        key={id}
                        className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-white/8 border border-white/15 text-white/60 text-[10px]"
                    >
                        {NODES_MAP[id] || id}
                        <button
                            onClick={() => toggle(id)}
                            className="text-white/30 hover:text-white/70 leading-none"
                        >
                            ×
                        </button>
                    </span>
                ))}
            </div>

            {/* Search + dropdown to add */}
            <div className="relative">
                <input
                    type="text"
                    placeholder="Search to add connections…"
                    value={search}
                    onFocus={() => setOpen(true)}
                    onChange={e => { setSearch(e.target.value); setOpen(true); }}
                    className={INPUT + ' text-xs'}
                    style={{ fontFamily: '"DM Sans", sans-serif' }}
                />
                {open && (
                    <div className="absolute top-full left-0 right-0 bg-black border border-white/15 max-h-48 overflow-y-auto z-20">
                        {filtered.slice(0, 50).map(id => (
                            <button
                                key={id}
                                onClick={() => { toggle(id); setSearch(''); }}
                                className={`w-full text-left px-3 py-2 text-xs transition-colors border-b border-white/5 last:border-0 ${connections.includes(id)
                                        ? 'text-white bg-white/8'
                                        : 'text-white/50 hover:bg-white/5 hover:text-white/80'
                                    }`}
                                style={{ fontFamily: '"DM Sans", sans-serif' }}
                            >
                                <span className={connections.includes(id) ? 'text-white' : ''}>
                                    {connections.includes(id) ? '✓ ' : ''}
                                </span>
                                {NODES_MAP[id] || id}
                                <span className="text-white/20 text-[9px] ml-2">{id}</span>
                            </button>
                        ))}
                        <button
                            onClick={() => setOpen(false)}
                            className="w-full text-center py-2 text-white/20 text-[9px] tracking-widest uppercase hover:text-white/50 border-t border-white/10"
                        >
                            Close
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
