# 批量为 study_road 文件夹中所有 HTML 文件添加返回按钮
$studyRoadPath = "c:\Users\ABCD4\Desktop\cat Agent\WUY-Cat\study_road"

# 获取所有子文件夹中的 index.html 文件
$htmlFiles = Get-ChildItem -Path $studyRoadPath -Filter "index.html" -Recurse

Write-Host "找到 $($htmlFiles.Count) 个 HTML 文件需要添加返回按钮"

foreach ($file in $htmlFiles) {
    Write-Host "正在处理: $($file.FullName)"
    
    # 读取文件内容
    $content = Get-Content -Path $file.FullName -Raw -Encoding UTF8
    
    # 检查是否已经有返回按钮
    if ($content -notmatch 'back-btn') {
        # 在 header 中添加返回按钮（在 subtitle 后面）
        $content = $content -replace '(<div class="subtitle">.*?</div>)', '$1`n    <a href="../../roadmap.html" class="back-btn">返回路线图</a>'
        
        # 写回文件
        Set-Content -Path $file.FullName -Value $content -Encoding UTF8 -NoNewline
        Write-Host "  ✓ 已添加返回按钮"
    } else {
        Write-Host "  - 已存在返回按钮，跳过"
    }
}

Write-Host "`n全部完成！共处理 $($htmlFiles.Count) 个文件"
