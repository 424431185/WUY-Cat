# 批量为 study_road 文件夹中所有 HTML 文件添加/更新返回按钮
$studyRoadPath = "c:\Users\ABCD4\Desktop\cat Agent\WUY-Cat\study_road"

# 获取所有子文件夹中的 index.html 文件
$htmlFiles = Get-ChildItem -Path $studyRoadPath -Filter "index.html" -Recurse

Write-Host "找到 $($htmlFiles.Count) 个 HTML 文件需要处理"

foreach ($file in $htmlFiles) {
    Write-Host "正在处理: $($file.FullName)"
    
    # 读取文件内容
    $content = Get-Content -Path $file.FullName -Raw -Encoding UTF8
    
    # 检查是否已经有返回按钮
    if ($content -match 'back-btn') {
        # 更新现有的返回链接为 tea-roadmap.html
        if ($content -match 'roadmap\.html') {
            $content = $content -replace 'href="../../roadmap\.html"', 'href="../../tea-roadmap.html"'
            Set-Content -Path $file.FullName -Value $content -Encoding UTF8 -NoNewline
            Write-Host "  ✓ 已更新返回链接为 tea-roadmap.html"
        } else {
            Write-Host "  - 返回按钮已是正确链接"
        }
    } else {
        # 添加新的返回按钮
        $content = $content -replace '(<div class="subtitle">.*?</div>)', '$1`n    <a href="../../tea-roadmap.html" class="back-btn">返回路线图</a>'
        Set-Content -Path $file.FullName -Value $content -Encoding UTF8 -NoNewline
        Write-Host "  ✓ 已添加返回按钮"
    }
}

Write-Host "`n全部完成！共处理 $($htmlFiles.Count) 个文件"
