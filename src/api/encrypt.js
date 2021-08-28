import {JSEncrypt} from 'jsencrypt'

export function encrypt(message){
  var encrypt=new JSEncrypt();
  encrypt.setPublicKey(`MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCI2iwuKkkeLd3X+z/bj++MzX0D4ueEJB1QC8YsMrQ1es80ECgwyULZ3Dl4Tv/uSqqBIuSuqfks/mKQo9MXPKjaZMSuWxCawnpjpRbinVrM6EAxZRmadfMvBODHhHbq4cUNlCBGQNwtZ8xAYERvSMpIEY8OzSe+Im2vekyZwVPWqwIDAQAB`);	//	 publicKey为公钥
  const txt = encrypt.encrypt(message);
  return txt;
}

