REM ToDo: ���·�����пո�ȷ��Ż���bug

@echo off
setlocal enabledelayedexpansion

REM ���İ������
SET ErrorFlag= ������
REM Ӣ�İ������
REM SET ErrorFlag= Error(s)

IF "%1"=="" (
  echo û��ָ����Ŀ�б��ļ�
  echo ��������˳�
  pause
  exit
) ELSE (
  echo ��Ŀ�б�%1
  echo ____________
  echo ���ڿ�ʼ����
  pause
)

SET LogDir=logs_default

IF NOT "%2"=="" (
  IF EXIST %2 (
    rd /s /q %2
  )
  SET LogDir=%2
)

SET ErrorProjects=error_projects_default.txt

IF NOT "%3"=="" (
  SET ErrorProjects=%3
)
SET TEMP_Error_Projects=_Temp_%ErrorProjects%
REM IF EXIST %ErrorProjects% (
REM  del %ErrorProjects%
REM )
REM (echo #) > %ErrorProjects%

mkdir %LogDir%

REM ����path
set originalPath=%path%
path %SYSTEMROOT%\Microsoft.NET\Framework64\v4.0.30319\
SET MSBuild_Params=/t:Rebuild /p:Configuration=Release /p:VisualStudioVersion=12.0 /l:FileLogger,Microsoft.Build.Engine;logfile=.\%LogDir%\

FOR /F "eol=#" %%i in (%1) do ( 
  for /F "usebackq delims=[]" %%I in (`echo %cd%\%%i`) do echo.��������%%~nxI
  for /F "usebackq delims=[]" %%I in (`echo %cd%\%%i`) do ( 
    msbuild.exe %%i %MSBuild_Params%%%~nxI.log.txt
	cd %LogDir%
    %SYSTEMROOT%\System32\find.exe /N "0%ErrorFlag%" %%~nxI.log.txt
    IF NOT "!errorlevel!"=="0" (
      echo %%i >> ..\%TEMP_Error_Projects%
    ) else (
      echo Build successfully.
    )
    echo current dir %cd%
	cd ..
  )
)

echo ������Ŀ��ϣ�������־��%LogDir%

REM ��ԭpath
path %originalPath%

pause
REM ----------��־����----------
echo ��ʼ������־

cls
cd %LogDir%
%SYSTEMROOT%\System32\find.exe /n "%ErrorFlag%" *.log.txt
cd ..

IF EXIST %TEMP_Error_Projects% (
  del %ErrorProjects%
  move %TEMP_Error_Projects% %ErrorProjects%
)

REM ����Retry
SET RetryBatName=%~n1.Retry.bat
IF EXIST %RetryBatName% (
  del %RetryBatName%
)
echo @echo off >> %RetryBatName%
echo set name=%~n3 >> %RetryBatName%
echo set logDir=logs_%%name%% >> %RetryBatName%
echo call ..\Build_Core.bat %ErrorProjects% %%logDir%% >> %RetryBatName%
echo pause >> %RetryBatName%