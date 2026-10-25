# Plan Implementasi: Fitur Dashboard Pencatatan Penjualan, Rincian HPP Dinamis, dan Analisis Profit Agensi

Dokumen ini merangkum rancangan arsitektur, skema database, alur kerja (workflow), serta komponen antarmuka pengguna untuk fitur pencatatan transaksi pembelian jasa agensi, manajemen rincian HPP (Harga Pokok Penjualan) yang dapat dimodifikasi secara dinamis (seperti saat ada promo hosting atau diskon domain), serta analisis laba bersih (*profit*) bulanan maupun tahunan pada Dashboard MarketingCode.ID.

---

## 1. Pemahaman Kebutuhan Bisnis & Studi Kasus

### Permasalahan & Kebutuhan Riil Agensi
1. **Pencatatan Penjualan Cepat:** Ketika ada klien memesan jasa (misal: Landing Page, Web Katalog, Company Profile, Iklan, atau Mobile App), admin membutuhkan form input order sederhana dengan opsi paket bawaan agensi yang langsung mengisi harga jual secara otomatis.
2. **Kebutuhan Rincian & Modifikasi HPP (Dynamic COGS Adjustment):**
   - Modal pengerjaan (*HPP*) setiap proyek sering kali tidak statis.
   - **Kasus Riil:** Pada paket Landing Page, biaya hosting awalnya dianggarkan Rp 200.000. Namun saat pengerjaan, agensi mendapatkan **promo hosting murah** seharga Rp 100.000, atau sebaliknya ada klien yang meminta add-on plugin khusus berbayar seharga Rp 75.000.
   - Agensi membutuhkan fitur untuk **melihat rincian pos-pos biaya HPP** per proyek dan **dapat memodifikasinya kapan saja** (menambah, mengubah nominal diskon/promo, atau menghapus pos biaya).
3. **Kalkulasi Laba Bersih Otomatis & Terkini:**
   - Begitu komponen biaya HPP disesuaikan, sistem harus secara otomatis me-rekalkulasi nilai:
     - Total HPP Proyek
     - Laba Bersih (Net Profit)
     - Margin Keuntungan (%)
4. **Ringkasan Finansial Agregat:**
   - Mengetahui secara instan berapa **Profit Bulan Ini** dan **Profit Tahun Ini**, serta perbandingannya dengan total omset penjualan dan total modal HPP yang telah dikeluarkan.

---

## 2. Formula & Logika Perhitungan Finansial

Sistem menggunakan formula akuntansi manajemen transparan:

1. **Total HPP per Proyek:**
   ```text
   Total HPP = Penjumlahan seluruh item HPP (Domain + Hosting + Freelancer + Lisensi/Tools + Lainnya)
   ```
2. **Laba Bersih per Proyek (Net Profit):**
   ```text
   Net Profit = Harga Jual - Total HPP
   ```
3. **Margin Keuntungan per Proyek (%):**
   ```text
   Profit Margin (%) = (Net Profit / Harga Jual) * 100%
   ```
4. **Agregasi Bulan Berjalan (Current Month):**
   - Filter transaksi dengan tanggal `order_date` berada di antara tanggal 1 bulan berjalan pukul 00:00:00 hingga saat ini.
   - Menghitung `SUM(selling_price)`, `SUM(total_hpp)`, `SUM(net_profit)`, dan rata-rata `profit_margin`.
5. **Agregasi Tahun Berjalan (Current Year):**
   - Filter transaksi dengan tanggal `order_date` berada di antara 1 Januari tahun berjalan pukul 00:00:00 hingga saat ini.
   - Menghitung `SUM(selling_price)`, `SUM(total_hpp)`, `SUM(net_profit)`, dan rata-rata `profit_margin`.

---

## 3. Desain Antarmuka Pengguna (UI/UX) di Dashboard

### A. Integrasi Navigasi Sidebar
Pada file [src/components/dashboard/sidebar-nav.tsx](file:///Users/ahmadkhairolmaulidi/Documents/Freelance/marketingcodeid-agency/project/src/components/dashboard/sidebar-nav.tsx):
- Menambahkan grup menu: `MANAJEMEN BISNIS`.
- Item menu:
  - **Judul:** `Keuangan & Order`
  - **Rute:** `/dashboard/keuangan`
  - **Icon:** `Wallet` atau `Receipt` (Lucide React Icons).

---

### B. Halaman Utama Keuangan (`/dashboard/keuangan/page.tsx`)

1. **Header & Bar Aksi:**
   - Judul: *Laporan Penjualan & Laba Bersih Agensi*.
   - Tombol Utama: **+ Tambah Order Baru**.
   - Dropdown Filter Periode: *Bulan Ini*, *Bulan Lalu*, *Tahun Ini*, *Semua Waktu*, atau *Rentang Kustom*.
   - Tombol Ekspor Data (format CSV / Excel).

2. **Bagian 1: Kartu Metrik Finansial Utama (KPI Cards):**
   - **Kartu 1: Laba Bersih (Net Profit)**
     - Nominal profit bulan ini (contoh: `Rp 15.400.000`).
     - Sub-teks: Total profit tahun ini (contoh: `Tahun ini: Rp 88.600.000`).
     - Indikator tren warna hijau jika margin sehat (> 50%).
   - **Kartu 2: Total Omset (Gross Revenue)**
     - Penjualan bulan ini (contoh: `Rp 22.800.000`).
     - Sub-teks: Total penjualan tahun ini (contoh: `Tahun ini: Rp 132.500.000`).
   - **Kartu 3: Total Modal HPP (Cost of Goods Sold)**
     - Total modal keluar bulan ini (contoh: `Rp 7.400.000`).
     - Sub-teks: Total HPP tahun ini (contoh: `Tahun ini: Rp 43.900.000`).
   - **Kartu 4: Rata-rata Profit Margin**
     - Persentase margin bulan ini (contoh: `67.5%`).
     - Sub-teks: Rata-rata tahun ini (contoh: `Rata-rata tahun ini: 66.8%`).

3. **Bagian 2: Ringkasan Grafik Tren Finansial (Bar Chart Bulanan):**
   - Menampilkan visualisasi batang bertumpuk atau bersebelahan: Bar Omset, Bar HPP, dan Garis Tren Net Profit untuk setiap bulan dalam tahun berjalan.

4. **Bagian 3: Tabel Riwayat Transaksi & Order:**
   - Kolom tabel:
     - No. Order (contoh: `#ORD-2610-001`)
     - Tanggal Transaksi
     - Klien & Bisnis (Nama klien, nama usaha, nomor WhatsApp)
     - Paket Layanan (Badge: Website, Ads, Mobile App, Custom)
     - Harga Jual (IDR)
     - Total HPP (IDR - dilengkapi tombol klik cepat untuk membuka rincian)
     - Net Profit (IDR - warna teks hijau terang untuk profit positif)
     - Margin (%)
     - Status Pembayaran (`Lunas`, `DP`, `Belum Bayar`)
     - Status Proyek (`Pengerjaan`, `Revisi`, `Selesai`)
     - Aksi:
       - **Tombol "Rincian HPP"** (Membuka panel drawer detail pos biaya)
       - **Tombol Edit Transaksi**
       - **Tombol Hapus Transaksi**

---

### C. Fitur Khusus: Panel Rincian & Modifikasi HPP (`HppDetailDrawer.tsx`)

Fitur ini menjawab langsung kebutuhan pemilik agensi untuk melihat rincian modal dan mengubahnya sewaktu-waktu (misalnya saat mendapat promo hosting, diskon domain, atau biaya tambahan lainnya):

1. **Bentuk Antarmuka:**
   Slide-Over Drawer (panel samping kanan) atau Modal Dialog yang dapat dibuka langsung dari baris tabel transaksi.
2. **Ringkasan Transaksi di Header Panel:**
   - Klien: *Budi Santoso (Travel Bandung Bali)*
   - Paket: *Website - Landing Page & Iklan*
   - Harga Jual: `Rp 1.190.000`
   - Total HPP Saat Ini: `Rp 250.000`
   - Laba Bersih Saat Ini: `Rp 940.000` (Margin: `79.0%`)
3. **Tabel Interaktif Komponen Biaya HPP:**
   Menampilkan daftar seluruh pos biaya modal untuk proyek ini:
   - **Item 1:** Kategori: `Hosting / Server` | Keterangan: *Cloud VPS 1 Tahun (Promo Diskon 50%)* | Nominal: `Rp 100.000`
   - **Item 2:** Kategori: `Domain` | Keterangan: *Registrasi Domain .com 1 Tahun* | Nominal: `Rp 150.000`
   - **Item 3:** Kategori: `Lisensi / Plugin` | Keterangan: *Template & Asset Icon Resmi* | Nominal: `Rp 0` (aset internal)
4. **Aksi Modifikasi Dinamis:**
   - **Ubah Nominal / Keterangan Langsung:** Jika harga hosting turun karena promo, user cukup klik nominal dan menggantinya dari `Rp 200.000` menjadi `Rp 100.000`.
   - **Tombol "+ Tambah Pos Biaya HPP":**
     Form input cepat untuk menambahkan biaya tak terduga (misal: *Freelancer Copywriter Tambahan: Rp 75.000*).
   - **Tombol Hapus Item:** Menghapus komponen biaya jika tidak jadi dikeluarkan.
5. **Kalkulasi Ulang Real-Time (Live Auto-Recalculate):**
   - Saat nominal pos biaya diubah, panel langsung memperbarui:
     - `Total HPP Baru`
     - `Net Profit Baru`
     - `Margin Baru`
   - Tombol **"Simpan Perubahan HPP"**:
     Mengeksekusi Server Action untuk mengupdate database, me-rekalkulasi baris order, dan memperbarui seluruh kartu ringkasan dashboard bulan ini & tahun ini tanpa reload halaman.

---

### D. Formulir Tambah Order Baru (`OrderFormModal.tsx`)

Formulir dirancang efisien dengan preset paket resmi:
1. **Pilihan Paket Layanan (Dropdown Otomatis):**
   - *Website - Landing Page & Iklan:* Harga Jual `Rp 1.190.000` (Preset HPP Awal: Hosting Rp 200.000 + Domain Rp 150.000 = Rp 350.000)
   - *Website - Web Katalog, Profil & Blog:* Harga Jual `Rp 2.190.000` (Preset HPP Awal: Hosting Rp 350.000 + Domain Rp 150.000 + Setup Rp 150.000 = Rp 650.000)
   - *Website - Company Profile Pro / Toko Online:* Harga Jual `Rp 3.490.000` (Preset HPP Awal: Rp 1.000.000)
   - *Iklan - Starter Trial 14 Hari:* Harga Jual `Rp 790.000`
   - *Iklan - Growth 30 Hari:* Harga Jual `Rp 1.490.000`
   - *Iklan - Omnichannel:* Harga Jual `Rp 2.890.000`
   - *Mobile App - MVP Mobile Starter:* Harga Jual `Rp 18.000.000`
   - *Mobile App - Full Commercial App:* Harga Jual `Rp 35.000.000`
   - *Custom / Paket Khusus:* Bebas memasukkan nama dan harga
2. **Kustomisasi Harga Jual:**
   Harga jual otomatis terisi sesuai paket yang dipilih, namun admin bebas mengedit jika ada diskon khusus klien atau biaya tambahan.
3. **Pilihan Input HPP Awal:**
   - *Opsi 1 (Gunakan Estimasi Standar Paket):* Sistem langsung mengisi item pos biaya standar.
   - *Opsi 2 (Kustom Langsung):* Admin dapat langsung memasukkan angka rincian yang sebenarnya (misal jika sudah tahu hosting dapat promo).
4. **Data Klien:**
   - Nama Klien
   - Nama Usaha / Perusahaan
   - Nomor WhatsApp
5. **Status Pembayaran & Tanggal:**
   - Tanggal Order (Default: Tanggal hari ini)
   - Status Pembayaran: `Lunas`, `DP`, `Belum Bayar`
   - Nominal Terbayar (jika memilih DP)
   - Status Proyek: `Pengerjaan`, `Selesai`, dsb.

---

## 4. Desain Skema Database (Drizzle ORM & PostgreSQL)

Penambahan dua tabel terelasi pada file [src/db/schema.ts](file:///Users/ahmadkhairolmaulidi/Documents/Freelance/marketingcodeid-agency/project/src/db/schema.ts):

### 1. Tabel Transaksi Penjualan (`orders`)
```typescript
export const orders = pgTable('orders', {
  id: uuid('id').primaryKey().defaultRandom(),
  orderNumber: varchar('order_number', { length: 30 }).notNull().unique(), // Contoh: ORD-202610-001
  clientName: varchar('client_name', { length: 255 }).notNull(),
  clientPhone: varchar('client_phone', { length: 30 }).notNull(),
  clientCompany: varchar('client_company', { length: 255 }),
  
  // Paket Layanan
  serviceCategory: varchar('service_category', { length: 50 }).notNull(), // 'website', 'ads', 'mobile', 'custom'
  packageName: varchar('package_name', { length: 255 }).notNull(),
  
  // Nilai Finansial (Tersinkronisasi otomatis dengan tabel rincian HPP)
  sellingPrice: integer('selling_price').notNull(), // Harga Jual ke Klien
  totalHpp: integer('total_hpp').notNull(),         // Total HPP (Sum of order_hpp_items)
  netProfit: integer('net_profit').notNull(),       // sellingPrice - totalHpp
  profitMargin: numeric('profit_margin', { precision: 5, scale: 2 }).notNull(), // (netProfit / sellingPrice) * 100
  
  // Status Pembayaran & Proyek
  paymentStatus: varchar('payment_status', { length: 20 }).notNull().default('paid'), // 'paid', 'down_payment', 'unpaid'
  paidAmount: integer('paid_amount').notNull().default(0),
  projectStatus: varchar('project_status', { length: 30 }).notNull().default('in_progress'), // 'in_progress', 'completed', 'revision', 'cancelled'
  
  orderDate: timestamp('order_date', { withTimezone: true }).notNull().defaultNow(),
  notes: text('notes'),
  
  createdBy: uuid('created_by').references(() => users.id, { onDelete: 'set null' }),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
}, (table) => [
  index('orders_order_date_idx').on(table.orderDate),
  index('orders_payment_status_idx').on(table.paymentStatus),
])
```

### 2. Tabel Rincian Pos Biaya HPP (`order_hpp_items`)
```typescript
export const orderHppItems = pgTable('order_hpp_items', {
  id: uuid('id').primaryKey().defaultRandom(),
  orderId: uuid('order_id').notNull().references(() => orders.id, { onDelete: 'cascade' }),
  category: varchar('category', { length: 50 }).notNull(), // 'hosting', 'domain', 'freelancer', 'license', 'tools', 'other'
  description: varchar('description', { length: 255 }).notNull(), // Contoh: 'Hosting Cloud VPS 1 Tahun (Promo Hostinger)'
  amount: integer('amount').notNull(), // Nominal pengeluaran (IDR)
  notes: text('notes'), // Catatan tambahan (misal: 'Kupon diskon PROMO50')
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
}, (table) => [
  index('order_hpp_items_order_id_idx').on(table.orderId),
])
```

---

## 5. Ringkasan Widget di Dashboard Utama (`/dashboard`)

Pada halaman ringkasan muka [src/app/(dashboard)/dashboard/(main)/page.tsx](file:///Users/ahmadkhairolmaulidi/Documents/Freelance/marketingcodeid-agency/project/src/app/(dashboard)/dashboard/(main)/page.tsx), disematkan widget ringkasan finansial di bagian atas:
- **Baris Finansial:**
  - `Profit Bersih Bulan Ini` vs `Tahun Ini`
  - `Total Omset Bulan Ini` vs `Tahun Ini`
  - `Total HPP Bulan Ini` vs `Tahun Ini`
  - `Margin Keuntungan Rata-rata (%)`
- **Tombol Pintas:**
  - `+ Catat Order Baru`
  - `Lihat Laporan Lengkap ->` menuju `/dashboard/keuangan`

---

## 6. Tahapan Pelaksanaan Implementasi (Roadmap Berurutan)

### Fase 1: Skema Database & Migrasi
1. Menambahkan definisi tabel `orders` dan `orderHppItems` pada [src/db/schema.ts](file:///Users/ahmadkhairolmaulidi/Documents/Freelance/marketingcodeid-agency/project/src/db/schema.ts).
2. Mengeksekusi migrasi skema database menggunakan `pnpm drizzle-kit push`.

### Fase 2: Backend Query Engine & Server Actions
1. Membuat fungsi utilitas kalkulasi agregasi SQL di `src/lib/financial/queries.ts`:
   - `getFinancialSummary(period: 'month' | 'year' | 'all')`
   - `getOrdersWithHppBreakdown(orderId)`
   - `recalculateOrderTotals(orderId)`: Menghitung ulang total HPP, laba bersih, dan margin setiap kali ada perubahan pada item pos biaya.
2. Membuat Server Actions di `src/app/(dashboard)/dashboard/(main)/keuangan/actions.ts`:
   - `createOrderAction`: Membuat order baru dan menginisialisasi rincian HPP awal.
   - `updateHppItemAction`: Menambah, mengubah nominal, atau menghapus item pos biaya HPP pada transaksi tertentu.
   - `updateOrderStatusAction`: Mengubah status pembayaran atau pengerjaan.
   - `deleteOrderAction`: Menghapus transaksi beserta seluruh rincian HPP-nya (*cascade delete*).

### Fase 3: Komponen Antarmuka & Panel Rincian HPP
1. Membangun kartu metrik finansial (`FinancialStatCard.tsx`).
2. Membangun modal input order (`OrderFormModal.tsx`) dengan logika preset paket.
3. Membangun panel drawer interaktif **`HppDetailDrawer.tsx`** untuk melihat dan memodifikasi rincian HPP secara dinamis.
4. Membangun tabel transaksi utama dengan badge status pembayaran dan proyek.

### Fase 4: Integrasi Navigasi & Halaman Dashboard
1. Menambahkan item menu `Keuangan & Order` pada [src/components/dashboard/sidebar-nav.tsx](file:///Users/ahmadkhairolmaulidi/Documents/Freelance/marketingcodeid-agency/project/src/components/dashboard/sidebar-nav.tsx) dan drawer mobile.
2. Menyusun halaman `/dashboard/keuangan/page.tsx`.
3. Mengintegrasikan widget ringkasan finansial pada halaman beranda `/dashboard/page.tsx`.

### Fase 5: Pengujian Mutu & Verifikasi Standar Project
1. Membuat pengujian integrasi otomatis di `tests/int/financial-orders.int.spec.ts` untuk menguji:
   - Kalkulasi laba bersih dan margin saat order dibuat.
   - Rekalkulasi otomatis saat item HPP dimodifikasi (misal saat hosting mendapat promo).
   - Akurasi agregasi finansial bulan berjalan dan tahun berjalan.
2. Menjalankan pengujian `pnpm test:int` (wajib 100% lulus).
3. Menjalankan kompilasi `pnpm build` (wajib sukses exit code 0).
4. Memastikan seluruh teks copywriting dan kode mematuhi aturan mutlak tanpa emoji (*Strict No-Emoji Rule*).

---

## 7. Dokumen Breakdown Tugas Eksekusi

Rincian task teknis yang siap dieksekusi langkah demi langkah oleh AI agent tersedia pada:
[docs/tasks-dashboard-keuangan-hpp-profit.md](file:///Users/ahmadkhairolmaulidi/Documents/Freelance/marketingcodeid-agency/project/docs/tasks-dashboard-keuangan-hpp-profit.md)

