@echo off
echo ====================================
echo   时光治愈者 - 构建项目
echo ====================================
echo.
echo 正在构建生产版本...
echo.

npm run build

if %errorlevel% equ 0 (
    echo.
    echo ====================================
    echo   构建成功！
    echo ====================================
    echo.
    echo 预览生产版本？ (Y/N)
    set /p choice=
    if /i "%choice%"=="Y" npm run preview
) else (
    echo.
    echo ====================================
    echo   构建失败！
    echo ====================================
)

pause