# Readme

We have:
  - office.int.crt
  - bath.office.int.crt
  - bath.office.int.key

### Step 1. 
Merge two certificates to one file.
Windows:
```
copy bath.office.int.crt+office.int.crt all.crt 
```
Linux:
```
cat bath.office.int.crt office.int.crt > all.crt
```

### Step 2.
Import this file to your glassfish domain cacerts.jks (<glassfish>/domians/<domain>/config/cacerts.jks).
```
keytool -import -trustcacerts -alias YOUR_ALIAS_1 -file all.crt -keystore cacerts.jks
```
keytool - java-based tool places in <JAVA_HOME>/bin
YOUR_ALIAS_1 is alias .jks file (does not matter)

### Step 3.
Create .p12 file with private key.
You should have openssl. I use 1.0.2 version.
```
openssl pkcs12 -export -in all.crt -inkey bath.office.int.key -out bath.office.int.p12 -name s1as -CAfile office.int.crt
```
Use *s1as* instead another alias because this is default alias name in glassfish and you should not change domain.xml file at all.

### Step 4.
Import private key using keytool
```
keytool -importkeystore -destkeystore keystore.jks -srckeystore bath.office.int.p12 -srcstoretype PKCS12 -alias s1as
```
Note: If your keystore.jks now containing object with alias *s1as* delete it:
```
keytool -delete -alias s1as -keystore keystore.jks
```

### Done
Restart glassfish.