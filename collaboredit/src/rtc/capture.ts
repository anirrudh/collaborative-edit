import * as Automerge from "automerge";
export function test_automerge() {
  //const wss = new ws.Server({port: conf.wssPORT});
  const currentDoc = Automerge.init();
  // This is kind of like the staging platform
  // for changes to be staged and then computed later
  const newDoc = Automerge.change(currentDoc, "first message", (doc: any) => {
    doc.text = new Automerge.Text();
    console.log(doc.text);
  });
  //const changes = Automerge.getChanges(currentDoc, newDoc);
}

/*
 * This function is used as the way to initialize
 * the Automerge document. This function returns an
 * empty document.
 */
export const init_am_doc = () => {
 	return Automerge.init();
}

// Do a new text document for automerge speed
export const init_am_doc_text = () => {
	return new Automerge.Text();
}

// Get the changes in state between the new document and the old one
export const changes_am_doc = (oldDoc: any, newDoc: any) => {
	console.log("Old", oldDoc);
	console.log("New", newDoc);
	return Automerge.getChanges(oldDoc, newDoc);
}

// Merge documents together and create one large document
export const merge_am_doc = (oldDoc: any, newDoc: any) => {
	console.log("Old", oldDoc);
	console.log("New", newDoc);
	return Automerge.merge(oldDoc, newDoc);
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
export const capture_character_input = (currentDoc: any, textDoc: any, text_char: any) => {	
	var msg = Automerge.getActorId(currentDoc) + " - add char " + text_char;
	return Automerge.change(currentDoc, msg, (doc: any) => {
		doc.text = textDoc;
		doc.text.insertAt(0, text_char);
	});
}

/*
 * This function handles a change of deletion
 * of a character from the current form.
 */
export const capture_character_delete = (currentDoc: any, textDoc: any, text_char: any) => {
       var msg = Automerge.getActorId(currentDoc) + " - deleted char " + text_char;
       return Automerge.change(currentDoc, msg, (doc: any) => {
	       doc.text = textDoc;
	       console.log(doc.text); 
	       doc.text.deleteAt(0, text_char);
       });
}
