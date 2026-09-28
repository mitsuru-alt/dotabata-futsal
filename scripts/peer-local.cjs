// Local signalling server for testing online play on a LAN / in CI: node scripts/peer-local.cjs
const {PeerServer}=require('peer');
PeerServer({port:+process.env.PORT||9000,host:'0.0.0.0',path:'/',allow_discovery:false});
console.log('PeerServer on :'+(process.env.PORT||9000));
