@echo off
setlocal enabledelayedexpansion

echo ��ǰĿ¼��%CD%
echo ���������%COMPUTERNAME%
echo �������0~32767����%RANDOM%
echo WindowsĿ¼��%WINDIR%
echo ��ǰ�û���%USERNAME%
echo ��%USERDOMAIN%
echo ʱ�䣺%TIME%
echo ��ʱĿ¼��%TEMP%
echo ϵͳ��λ�ã�%SYSTEMROOT%
echo ______________________________________
echo.
echo ��ǰʵ��ִ�е�.bat��λ�ã�%0
echo %1
echo %2
call .\parameter.bat
echo ���.bat���ûᱨ���
echo ȫ��������%*
echo ______________________________________
echo.
REM set /p userInput=������������
echo ������������ǣ�%userInput%

set var1=1+1
echo %var1%
set /A var2=1+1
echo %var2%

set aa=0812
set /a aa=1%aa%-10000
echo %aa%

echo set /a��������ִ�кܶ�����ֵ���㣬����λ����
echo ______________________________________
echo.
set bbb=��   ��  �� ��
set bbbb=%bbb: =%
echo ȥ���ո��
echo %bbbb%
echo %bbb:��=��%

REM �ӵ�1����������0��ʼ����ʼ��ȡ2�����ȣ����ȿ���ʡ��
set bbbbb=012345678
echo %bbbbb:~1,2%

echo ______________________________________
echo.

for /l %%i in (1,1,5) do (
set a=%%i
echo !a!
)
pause