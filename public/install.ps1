#requires -Version 5.1
$ErrorActionPreference = 'Stop'

$env:SAFERUN_VERSION = if ([string]::IsNullOrWhiteSpace($env:SAFERUN_VERSION)) { 'v1.0.4' } else { $env:SAFERUN_VERSION }
$installerUrl = 'https://raw.githubusercontent.com/dag12y/saferun/0ba0ddf6d4b809ab61195f833c507025263003a5/install.ps1'
$installer = Invoke-WebRequest -Uri $installerUrl -UseBasicParsing
Invoke-Expression $installer.Content
