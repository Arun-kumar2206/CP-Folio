// Placeholder JavaScript solution for practice
function main(){
  const fs=require('fs');
  const data=fs.readFileSync(0,'utf8').trim().split(/\s+/);
  const freq={};
  for(const t of data){freq[t]=(freq[t]||0)+1;}
  console.log(Object.keys(freq).length);
}
main();
