// Crypto API mock for test environment
const cryptoMock = {
  getRandomValues: function(buffer) {
    for (let i = 0; i < buffer.length; i++) {
      buffer[i] = Math.floor(Math.random() * 256);
    }
    return buffer;
  }
};

if (typeof global.crypto === 'undefined') {
  global.crypto = cryptoMock;
}

export default cryptoMock;