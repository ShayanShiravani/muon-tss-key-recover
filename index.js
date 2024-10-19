require("dotenv").config();

const TssModule = require('./tss/index.js');
const tssShares = process.env.TSS_SHARES.split(",");

const bn2str = num => num.toBuffer('be', 32).toString('hex');

const tssKeys = tssShares.map((share, index) =>
  ({i: index + 1, key:TssModule.keyFromPrivate(share)})
);

// tssKeys.map(s => console.log({"i": s.i, "key":"0x" + s.key.getPrivate("hex")}));

console.log(
  `TSS Private Key: ${
    bn2str(TssModule.reconstructKey(tssKeys, process.env.TSS_T))
  }`
);