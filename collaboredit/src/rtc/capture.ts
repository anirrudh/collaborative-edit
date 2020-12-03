import * as Automerge from "automerge";
export function test_automerge() {
  //const wss = new ws.Server({port: conf.wssPORT});
  const currentDoc = Automerge.init();
  // This is kind of like the staging platform
  // for changes to be staged and then computed later
  const newDoc = Automerge.change(currentDoc, "first message", (doc: any) => {
    doc.text = new Automerge.Text();
    doc.text.insertAt(0, "h", "e", "l", "l", "o");
  });
  //const changes = Automerge.getChanges(currentDoc, newDoc);
}

/*
 * This function is used as the way to initialize
 * the Automerge document. This function returns an
 * empty document.
 */
export const init_am_doc = () => {
}
/*
 * This function takes in exactly one character
 * and then makes that change to the document. This is then
 * sent instantly as a change that is made to the document,
 * timestamps are compared, and then a merge happens.
 *
 * Messages will be unique to the node that they are spawned from
 * and as a result will contain the ActorID as part of the signature. 
 */
export function capture_character_input(currentDoc: any, text_char: any) {	
	var insertion_index = currentDoc.text.length; 
	var msg = Automerge.getActorId(currentDoc) + " - adding a new commit!";
	let newDoc = Automerge.change(currentDoc, msg, (doc: any) => {
		doc.text.insertAt(insertion_index, text_char);
	});
	console.log("New Document :" + newDoc);
}
