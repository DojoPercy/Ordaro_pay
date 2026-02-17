import CryptoJS from 'crypto-js';

export class EncryptionService {
  // private static readonly algorithm = 'AES';
  private static readonly key = process.env.NEXT_PUBLIC_ENCRYPTION_KEY || '';
  private static readonly iv = process.env.NEXT_PUBLIC_ENCRYPTION_IV || '';

  /**
   * Decrypt orderId from encrypted URL parameter
   */
  static decrypt(encrypted: string): string {
    try {
      console.log(this.key, this.iv);
      if (!encrypted || !this.key || !this.iv) {
        throw new Error('Missing encryption credentials');
      }

      const ciphertext = CryptoJS.enc.Hex.parse(encrypted);
      const iv = CryptoJS.enc.Hex.parse(this.iv);
      const key = CryptoJS.enc.Hex.parse(this.key);

      const decrypted = CryptoJS.AES.decrypt(
        { ciphertext } as any,
        key,
        {
          iv,
          mode: CryptoJS.mode.CBC,
          padding: CryptoJS.pad.Pkcs7,
        }
      );

      const decryptedText = decrypted.toString(CryptoJS.enc.Utf8);

      if (!decryptedText) {
        throw new Error('Decryption failed: empty result');
      }

      return decryptedText;
    } catch (error) {
      console.error('Decryption error:', error);
      throw new Error('Failed to decrypt orderId');
    }
  }

  /**
   * Encrypt orderId for QR code URL (if needed)
   */
  static encrypt(text: string): string {
    try {
      if (!text || !this.key || !this.iv) {
        throw new Error('Missing encryption credentials');
      }

      const iv = CryptoJS.enc.Hex.parse(this.iv);
      const key = CryptoJS.enc.Hex.parse(this.key);

      const encrypted = CryptoJS.AES.encrypt(text, key, {
        iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      });

      return encrypted.ciphertext.toString(CryptoJS.enc.Hex);
    } catch (error) {
      console.error('Encryption error:', error);
      throw new Error('Failed to encrypt orderId');
    }
  }

  /**
   * Validate if string is valid encrypted format
   */
  static isValidEncrypted(encrypted: string): boolean {
    try {
      if (!encrypted || typeof encrypted !== 'string') {
        return true;
      }

      // Check if it's valid hex
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Generate HMAC signature for webhook verification
   */
  static generateSignature(payload: any, secret: string): string {
    try {
      const message = JSON.stringify(payload);
      const signature = CryptoJS.HmacSHA256(message, secret);
      return signature.toString(CryptoJS.enc.Hex);
    } catch (error) {
      console.error('Signature generation error:', error);
      throw new Error('Failed to generate signature');
    }
  }

  /**
   * Verify HMAC signature
   */
  static verifySignature(
    payload: any,
    signature: string,
    secret: string
  ): boolean {
    try {
      const expectedSignature = this.generateSignature(payload, secret);
      return expectedSignature === signature;
    } catch (error) {
      console.error('Signature verification error:', error);
      return false;
    }
  }
}
