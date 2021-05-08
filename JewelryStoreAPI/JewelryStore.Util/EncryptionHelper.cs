using System.Security.Cryptography;

namespace JewelryStore.Util
{
    public static class EncryptionHelper
    {
        public static byte[] GenerateSaltHash(byte[] plainText, byte[] salt)
        {
            if (plainText == null || salt == null) return null;
            using (var algorithm = new SHA512Managed())
            {
                var plainTextWithSaltBytes =
                  new byte[plainText.Length + salt.Length];

                for (int i = 0; i < plainText.Length; i++)
                    plainTextWithSaltBytes[i] = plainText[i];

                for (int i = 0; i < salt.Length; i++)
                    plainTextWithSaltBytes[plainText.Length + i] = salt[i];

                return algorithm.ComputeHash(plainTextWithSaltBytes);
            }
        }

        public static bool CompareByteArrays(byte[] array1, byte[] array2)
        {
            if (array1 == null || array2 == null) return false;
            if (array1.Length != array2.Length)
                return false;

            for (int i = 0; i < array1.Length; i++)
                if (array1[i] != array2[i])
                    return false;

            return true;
        }

        public static byte[] CreateSalt(int size)
        {
            using (var rng = new RNGCryptoServiceProvider())
            {
                var buff = new byte[size];
                rng.GetBytes(buff);
                return buff;
            }
        }
    }
}
