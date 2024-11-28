require("dotenv").config();

const TssModule = require('./tss/index.js');
const tssShares = process.env.TSS_SHARES.split(",");
const tssNodes = process.env.TSS_NODES.split(",");

const bn2str = num => num.toBuffer('be', 32).toString('hex');

const tssKeys = tssShares.map((share, index) =>
  ({i: tssNodes[index], key:TssModule.keyFromPrivate(share)})
);

// tssKeys.map(s => console.log({"i": s.i, "key":"0x" + s.key.getPrivate("hex")}));
const recoveredKey = bn2str(TssModule.reconstructKey(tssKeys, process.env.TSS_T));

console.log(
  `TSS Private Key: ${
    recoveredKey
  }`
);
console.log(
  `TSS Public Key: ${
    TssModule.pub2addr(TssModule.key2pub(recoveredKey))
  }`
);