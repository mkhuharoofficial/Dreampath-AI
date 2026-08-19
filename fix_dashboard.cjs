const fs = require('fs');
let code = fs.readFileSync('src/components/Dashboard.tsx', 'utf8');

// Replace card in search results
code = code.replace(/<motion\.div[\s\S]*?className="group p-6 bg-white border border-slate-200 rounded-3xl hover:border-indigo-600\/30 hover:shadow-lg hover:shadow-indigo-600\/5 transition-all cursor-pointer shadow-sm flex flex-col justify-between h-full relative"[\s\S]*?onClick=\{\(\) => onSelectDegree\(degree\)\}[\s\S]*?<\/motion\.div>/g, 
`<motion.button
  key={degree.id}
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
  onClick={() => onSelectDegree(degree)}
  className="text-left p-4 bg-white border border-slate-200 hover:border-indigo-500 rounded-2xl hover:shadow-md hover:shadow-indigo-500/10 transition-all flex flex-col justify-between group h-full relative"
>
  <div className="flex justify-between w-full items-start mb-2.5">
    <span className="text-[9px] font-extrabold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md border border-indigo-100/50">
      {degree.duration}
    </span>
    <button
      onClick={(e) => {
        e.stopPropagation();
        onToggleFavorite(degree.id);
      }}
      className="text-slate-300 hover:text-amber-500 transition-colors"
    >
      <Bookmark size={14} fill={favoriteIds.includes(degree.id) ? "currentColor" : "none"} className={favoriteIds.includes(degree.id) ? "text-amber-400" : ""} />
    </button>
  </div>
  <h4 className="text-sm font-black text-slate-800 group-hover:text-indigo-600 transition-colors tracking-wide leading-tight">
    {degree.title}
  </h4>
</motion.button>`);

// Also change grid cols classes
code = code.replace(/<div className="grid grid-cols-1 md:grid-cols-2 gap-6">/g, '<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">');

fs.writeFileSync('src/components/Dashboard.tsx', code, 'utf8');
