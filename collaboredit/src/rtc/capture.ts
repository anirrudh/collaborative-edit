import * as Automerge from 'automerge'; 
export function test_automerge() {
//const wss = new ws.Server({port: conf.wssPORT});
let currentDoc = Automerge.init();
console.log(currentDoc);
// This is kind of like the staging platform
// for changes to be staged and then computed later
let newDoc = Automerge.change(currentDoc, 'first message', (doc: any) => {
  doc.text = new Automerge.Text();
  doc.text.insertAt(0, 'h', 'e', 'l', 'l', 'o');
});
console.log(currentDoc);

let changes = Automerge.getChanges(currentDoc, newDoc);
console.log(changes);
};

