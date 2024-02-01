/*
relay.js
made by kiran
01/31/2024
*/

if ("serial" in navigator) {
  document.getElementById("btn").addEventListener("click", async () => {
    let baudrate = parseInt(document.getElementById("baud").value);
    if (isNaN(baudrate)) {
      alert("Invalid Baud Rate!");
      window.location.reload();
    }
    const filters = [
      { usbVendorId: 0x2341, usbProductId: 0x0001 }, // uno
      { usbVendorId: 0x2341, usbProductId: 0x0010 }, // mega 2560
      { usbVendorId: 0x2341, usbProductId: 0x0043 }, // uno r3
      { usbVendorId: 0x2341, usbProductId: 0x0042 }, // mega 2560 r3
      { usbVendorId: 0x2341, usbProductId: 0x1002 }, // uno r4
    ];
    const port = await navigator.serial.requestPort({ filters });
    await port.open({ baudRate: baudrate });
    // const { usbProductId, usbVendorId } = port.getInfo();

    const textDecoder = new TextDecoderStream();
    const readableStreamClosed = port.readable.pipeTo(textDecoder.writable);
    const reader = textDecoder.readable.getReader();

    // Listen to data coming from the serial device.
    while (true) {
      const { value, done } = await reader.read();
      if (done) {
        // Allow the serial port to be closed later.
        await port.close();
        reader.releaseLock();
        break;
      }
      // value is a string.
      console.log(value);
    }
  });
} else {
  window.location.replace("/error/browser/?src=relay");
}
