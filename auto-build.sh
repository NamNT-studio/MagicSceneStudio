#!/bin/bash
# ===========================================================
# 🚀 MAGICSCENESTUDIO - AUTO BUILD & DEPLOY (by Will & GPT-5)
# ===========================================================

echo ""
echo "🧙‍♂️ BẮT ĐẦU QUY TRÌNH AUTO-BUILD & DEPLOY MAGICSCENESTUDIO"
echo "-----------------------------------------------------------"

# 1️⃣ Cài đặt thư viện nếu chưa có
echo "📦 Cài đặt dependencies (npm install)..."
npm install

# 2️⃣ Build dự án bằng Vite
echo "🏗️ Đang build dự án React/Vite..."
npm run build

# 3️⃣ Kiểm tra thư mục build
if [ -d "dist" ]; then
  echo "✅ Build hoàn tất! Thư mục /dist đã sẵn sàng."
else
  echo "❌ Không tìm thấy thư mục /dist. Dừng tiến trình!"
  exit 1
fi

# 4️⃣ Nếu đang deploy lên GitHub Pages:
# Tự động commit và push branch 'main' (hoặc 'gh-pages')
echo "🌍 Chuẩn bị deploy lên GitHub Pages..."
git add .
git commit -m "Auto build & deploy MagicSceneStudio"
git push origin main

# 5️⃣ Nếu bạn dùng Vercel, uncomment dòng dưới đây:
# echo "🚀 Deploy lên Vercel..."
# npx vercel --prod --confirm

# 6️⃣ Mở web sau khi deploy
echo "🌐 Mở trang web..."
sleep 3
xdg-open https://namnt-studio.github.io/MagicSceneStudio/ 2>/dev/null || \
open https://namnt-studio.github.io/MagicSceneStudio/

echo ""
echo "✅ HOÀN TẤT! MagicSceneStudio đã được build & deploy thành công."
echo "-----------------------------------------------------------"
