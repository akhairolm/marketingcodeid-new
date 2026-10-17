<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Mandatory Post-Implementation Testing & Quality Protocol

Setiap kali agent selesai mengerjakan tugas (fitur baru, refactoring, perubahan styling, CRO/copywriting, atau perbaikan bug):

1. **Build Validation:**
   - Wajib menjalankan `pnpm build` dan memastikan proses kompilasi lolos dengan exit code 0 tanpa error TypeScript atau kegagalan route generation.
2. **Production Server & Integration Test:**
   - Jalankan `pnpm test:int` (seluruh unit/integration test harus 100% pass).
   - Jalankan `pnpm start` (atau server produksi lokal) untuk memastikan server siap melayani request.
3. **Lighthouse Audit Gate (Desktop & Mobile):**
   - Wajib melakukan pengujian Google Lighthouse baik profil **Desktop** maupun **Mobile**.
   - Seluruh 4 kategori penilaian wajib mencapai skor **> 90**:
     - **Performance:** > 90
     - **Accessibility:** > 90
     - **Best Practices:** > 90
     - **SEO:** > 90
   - Jika terdapat skor < 90, agent wajib melakukan optimasi perbaikan, melakukan re-build, dan menguji ulang hingga seluruh skor memenuhi kriteria > 90.
4. **Agentic Browsing & Visual UX Verification:**
   - Lakukan penjelajahan interaktif via browser subagent pada mode **Desktop (1280x800)** dan **Mobile (390x844)**.
   - Pastikan link CTA (terutama tombol WhatsApp resmi `6285128038243`), menu navigasi/hamburger mobile, sticky floating button, dan responsivitas layout bekerja optimal tanpa kebocoran horizontal scroll.
