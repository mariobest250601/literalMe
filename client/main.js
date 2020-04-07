import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import 'meteor/jkuester:blaze-bs4'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css' // this is the default BS theme as example
import popper from 'popper.js'
global.Popper = popper // fixes some issues with Popper and Meteor
import './main.html';
import '../lib/collection.js';

Template.Edit.events({
		
		'click .js-UpdateImage'(event, instance){
			var Newtitle= $("#EditTitle").val();
			var Newauthor= $("EditAuthor").val();
			var NewPath= $("#EditPath").val();
			var NewDesc= $("#EditDesc").val();
			var UpdatedID= $("#editId").val();
			//console.log("updating "+UpdatedID+"Title "+Newtitle+"Author"+Newauthor+"Path "+NewPath+"Descrtion"+NewDesc);
			bookdb.update({_id: UpdatedID}, 
				{$set: {
				"Title":Newtitle,
				"Author":Newauthor,
				"Path":NewPath,
				"Desc":NewDesc
				}}
			);
			
		}
		
   		
   		
	
});





Template.myJumbo.events({
'click .js-Show'(event, instance){
		//console.log("Adding Image");
	},


'click .js-close'(event, instance){
		//console.log("closing ");

	},	

'click .js-save'(event,instance){
 	// saving the path,title and description	
		var theTitle= $("#Title").val();
		var theAuthor= $("#Author").val();
		var thePath= $ ("#Path").val();
		var theDesc= $ ("#Desc").val();

		 //console.log("saving Image with title: "+theTitle+"and its path is: "+thePath+"and its description "+theDesc);
		bookdb.insert({
   		
   		"Title": theTitle,
   		"Author": theAuthor,
   		"Path": thePath,
   		"Desc": theDesc	
   
   	  });
		// saving and closing modal
		//console.log("saving...");
		  $('#Addbk').modal('hide');
		  var theTitle= $("#Title").val("");
		  var theAuthor= $("#Author").val("");
		  var thePath= $ ("#Path").val("");
		  var theDesc= $ ("#Desc").val("");
	},
	'input #Path'(event,instance){
		//console.log($("#Path").val());
		$(".placeholder").attr("src", $("#Path").val());
		// console.log("pop "+$("#Path").val());
	
	},

	

});


Template.mainBody.events({

	'click .js-view'(event, instance){
	$("#viewM").modal("show");
	var myID= this._id;
	$('#viewcontent').html(bookdb.findOne({_id:myID}).Desc);
    },
	

'click .js-delete'(event, instance)  {
		var myID= this._id;
	$("#"+this._id).fadeOut('slow',function(){
		bookdb.remove({_id:myID});
		//console.log(myID);
		});
	},

'click .js-edit'(event, instance){
		var myID= this._id;
		$("#Editmodal").modal("show");
		 //console.log("lets edit"+this._id);
		var eTitle = bookdb.findOne({_id:myID}).Title;
		var eAuthor = bookdb.findOne({_id:myID}).Author;
		var ePath = bookdb.findOne({_id:myID}).Path;
		var eDesc = bookdb.findOne({_id:myID}).Desc;
		$("#EditId").val(myID);
		$("#EditTitle").val(eTitle);
		$("#EditAuthor").val(eAuthor);
		$("#EditPath").val(ePath);
		$("#EditDesc").val(eDesc);
		$(".Editplaceholder").attr("src",ePath);
		
	}


});


Template.mainBody.helpers({
books(){
	return bookdb.find();
}
});


Template.myBooks.helpers({

	allBooks(){
		return bookdb.find();

	}

	
});

