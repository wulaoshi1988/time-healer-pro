@echo off
echo ====================================
echo   准备部署到 Vercel
echo ====================================
echo.

echo 第1步：检查Git状态
git status

echo.
echo 第2步：添加所有文件
git add .

echo.
echo 第3步：提交代码
git commit -m "准备部署到Vercel"

echo.
echo ====================================
echo   代码已准备好！
echo ====================================
echo.
echo 接下来的步骤：
echo 1. 在GitHub创建新仓库: https://github.com/new
echo 2. 仓库名: time-healer-pro
echo 3. 运行以下命令连接仓库：
echo.
echo    git remote add origin https://github.com/你的用户名/time-healer-pro.git
echo    git push -u origin main
echo.
echo 4. 访问 Vercel 部署: https://vercel.com/new
echo.

pause