/**
 * @author Rajukonga
 */

var taskManager = new tasketra();


var MasterView = function(){
	var addListInput = document.getElementById("addTaskList");
	var addListBtn = document.getElementById("addTaskListBtn");
	var addlistForm = document.getElementById("addtasklist-form");
	addlistForm.onsubmit = function(e){
		e.preventDefault();
	};
	addListBtn.onclick = function(e){
		addList();
	};
	addListInput.onkeypress=function(e){
		if(e.keyCode != 13)
			return;
		
		addList();
			
		
	};
	
	
	function addList(){
		var listname = addListInput.value;
		if(!listname.length){
			alert("Please enter list name");
			return;
		}
			
			var tasklist = taskManager.addTasklist(listname);
			
			taskListsView.addTaskList(tasklist);
			addListInput.value = '';
	}
	
	
	var taskListsView = new TaskListsView();
	
	
};

var TaskListsView = function(){
	this.$el=document.getElementById("taskLists");
	//this.tasksViewer = new TasksViewer;
};

TaskListsView.prototype.addTaskList = function(tasklist){
	//console.log(tasklist);
	var self = this;
	
	var listItem = document.createElement("li");
	var innerSec = new TasksViewer(tasklist);
	
	var innerObj = innerSec.render();
	
	listItem.appendChild(innerObj.$el);
	
	
	innerObj._delete.onclick = function(e){
		e.stopPropagation();
		taskManager.removeTasklist(tasklist.info());
		self.$el.removeChild(listItem);
	};
	listItem.className += " tasklist pull-left";
	this.$el.appendChild(listItem);
	
	
	
	
	
	
	
};


var TasksViewer = function(tasklist){
	this.$el = null;
	this.tasklist = tasklist;
	
	var self = this;

	
	
	
};

TasksViewer.prototype.clear = function(){
	this.$el.innerHTML = '';
	
};

TasksViewer.prototype.render = function(){
	var tasklist =this.tasklist;
	var self = this;
	var name = document.createTextNode(tasklist.name);
	var deleteNode = document.createElement('span');
	var innerSec = document.createElement('div');
	var titleSec = document.createElement("div");
	var listSec =  document.createElement("div");
	var addSec = document.createElement("div");
	
	
	deleteNode.className += " fa fa-trash-o list-remove pull-right"; 
	
	
	titleSec.appendChild(name);
	titleSec.appendChild(deleteNode);
	
	var dropSec = document.createElement("div");
	listSec.className += " tasklistSec";
	
	
	dropSec.ondragover = function(e){
		e.preventDefault();
		e.stopPropagation();
	};
	
	dropSec.ondrop = function(e){
		e.stopPropagation();
		e.preventDefault();
		var data=JSON.parse(e.dataTransfer.getData('text/plain'));
		var task = tasklist.add(data.task.name);
		self.appendTask(task);
	};
	
	dropSec.className += " taskDrop";
	var dropname= document.createTextNode("Drop Here");
	dropSec.appendChild(dropname);
	
	listSec.appendChild(dropSec);
	
	var addTaskInput = document.createElement('input');
	addTaskInput.setAttribute('type', 'text');
	addTaskInput.setAttribute('placeholder', 'Add Task');
	
	addTaskInput.className += " form-control";
	addTaskInput.onkeypress=function(e){
		if(e.keyCode == 13){
			var taskname = addTaskInput.value;
			if(!taskname.length){
			alert("Please enter a task name");
				return;
			}
			
			if(!self.tasklist){
				alert("Please select a task list to add task!");
				return;
			}
				var task = self.tasklist.add(taskname);
				
				self.appendTask(task);
				addTaskInput.value = '';
		}
	};
	
	addSec.appendChild(addTaskInput);
	
	innerSec.appendChild(titleSec);
	innerSec.appendChild(listSec);
	innerSec.appendChild(addSec);
	
	innerSec.className += " panel panel-default";
	titleSec.className += " panel-heading";
	listSec.className += " panel-body";
	addSec.className += ' pane-footer';
	
	
	this.$el = innerSec;
	this._delete= deleteNode;
	this.$list = listSec;
	
	
	return this;
	
	
	/*
	for(var i=0;i<tasks.length;i++){
		this.appendTask(tasks[i]);
	}*/
	
	
	
};

TasksViewer.prototype.reset = function(tasklist){
	this.tasklist=tasklist;
	this.clear();
	this.render(this.tasklist.getTasks());
	this.changeTitle(tasklist);
};
TasksViewer.prototype.changeTitle = function(tasklist){
	document.getElementById("tasklist-title").innerHTML=tasklist.name; 
};


TasksViewer.prototype.appendTask = function(task){
	
	var self = this;
	var taskView = new TaskView(task,this.tasklist,this.$list);
	
	var listItem = taskView.render().$el;
	
	this.$list.appendChild(listItem);
};



var TaskView = function(task,tasklist,container){
	this.task = task;
	this.tasklist = tasklist;
	this.$container = container;
}; 
TaskView.prototype.render = function(){
	
	var self =this;
	var task = this.task;
	var name = document.createTextNode(task.name);
	var listItem = document.createElement("div");
	
	
	var deleteNode = document.createElement('span');
	
	
	deleteNode.className += " fa fa-trash-o task-remove pull-right"; 
	deleteNode.onclick = function(e){
		e.stopPropagation();
		self.tasklist.remove(task.get("id"));
		self.$container.removeChild(listItem);
	};
	
	
	listItem.appendChild(name);
	listItem.appendChild(deleteNode);
	listItem.className += " task";
	listItem.setAttribute('draggable',true);
	listItem.ondragstart=function(e){
		e.dataTransfer.setData('text/plain',JSON.stringify({task:task,taskList: self.tasklist}));
	};
	
	this.$el=listItem;
	return this;
};




var tasketraView = new MasterView;
