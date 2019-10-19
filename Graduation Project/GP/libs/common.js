const crypto=require('crypto');
const fs=require('fs');
const Teacher=require('./teacher.js');
const Center=require('./center.js');
module.exports={
	MD5_SUFFIX:'GGbhbxhzyhYGYGY^&^uHYt6txHHJVBXVgbxzB',
	md5:function(str){
		var obj=crypto.createHash('md5');
		obj.update(str);
		return obj.digest('hex');
	},
	loadHtml:function(url,res){
		var file_name='./views'+url+'.html';
		// console.log(file_name);
		fs.readFile(file_name,function(err,data){
			if(err){
				res.write('404');
			}else{
				res.write(data);
			}
			res.end();
		})
	},
	kmeansInit:function(persons){
		var iter=500;
		var feature_number=2;
		var k=6;
		var x=0;
		var data=[];
		//console.log(persons[0])
	    for(let i=0;i<persons.length;i++){
		    data[i]=[];
		    data[i][0]=persons[i].evaluation*10;
		    data[i][1]=persons[i].salary;
		    data[i][2]=persons[i].times;
		    data[i][3]=-1;
		    data[i][4]=persons[i]._id;
		}
	    var centers=[];
	    for(let i=0;i<k;i++){
		    centers[i]={};
		    centers[i].x=Math.random()*50+50;
		    centers[i].y=Math.random()*50+50;
		    centers[i].z=Math.random()*100+20;
	  	}
	 	var flag=0;
	  	while((x<iter)&&(!flag)){
	    	var centersTemp=[];
	    	for(let i=0;i<k;i++){
		    	centersTemp[i]={};
		    	centersTemp[i].x=centers[i].x;
		    	centersTemp[i].y=centers[i].y;
		    	centersTemp[i].z=centers[i].z;
	    	}
	    	for(let i=0;i<persons.length;i++){
	        	var dist=[];
	        	var min=10000000000;
	        	for(let j=0;j<k;j++){
	            	dist[j]=Math.pow((Math.pow((data[i][0]-centers[j].x),2)+Math.pow((data[i][1]-centers[j].y),2)+Math.pow((data[i][2]-centers[j].z),2)),1/3);
	            //  dist[j]=Math.pow((Math.pow((data[i][0]-centers[j].x),2)+Math.pow((data[i][0]-centers[j].y),2)+Math.pow((data[i][2]-centers[j].z),2)),1/3);
	            	if(min>dist[j]){
	                	min=dist[j];
	                	data[i][3]=j;
	            	}
	        	}
	    	}
	    	for(let j=0;j<k;j++){
	        	var num=0;
	        	var centerxSum=0;
	        	var centerySum=0;
	        	var centerzSum=0;
	        	for(let i=0;i<persons.length;i++){ 
	            	if(data[i][3]==j){
	               		centerxSum+=data[i][0];
	               		centerySum+=data[i][1];
	               		centerzSum+=data[i][2];
	               		num++;
	            	}
	        	}
	        	if(num>0){
	            	centers[j].x=centerxSum/num;
	            	centers[j].y=centerySum/num;
	            	centers[j].z=centerzSum/num;
	            //	console.log("x="+centers[j].x+"  y="+centers[j].y+"  z="+centers[j].z);
	            	num=0;
	        	}
	    	}
	    	for(let j=0;j<k;j++){
	        	if((centersTemp[j].x==centers[j].x)&&(centersTemp[j].y==centers[j].y)&&(centersTemp[j].z==centers[j].z)){
	            	flag=1;
	        	}else{
	            	flag=0;
	        	}
	    	}
	    	x++;
		}
		//console.log("次数=="+x);
		var kinds=[];
		for(let i=0;i<6;i++){
			kinds[i]=0;
		}
		for(let i=0;i<data.length;i++){
			kinds[data[i][3]]++;
		}
		for(let i=0;i<6;i++){
			console.log('persons['+i+']='+kinds[i]);

		}
		if(kinds[0]<10||kinds[1]<10||kinds[2]<10||kinds[3]<10||kinds[4]<10||kinds[5]<10){
			return 0;
		}else{
		for(let i=0;i<persons.length;i++){
		   		 console.log(data[i][3]);
		   		 Teacher.updateTeacher(data[i][4],{$set:{kind:data[i][3]}},function(err){
		   		 	if(err){
		   		 		console.log('updata teacher kind error')
		   		 	}else{
		   		 		console.log('ok')
		   		 	}
		   		 })
			}
		Center.deleteAll(function(err){
			if(err){
				console.log('error....')
			}else{
				for(let j=0;j<k;j++){
			   		console.log("x="+centers[j].x+"  y="+centers[j].y+"  z="+centers[j].z);
			   		var data={};
			   		data.posX=centers[j].x;
			   		data.posY=centers[j].y;
			   		data.posZ=centers[j].z;
			   		data.kind=j;
			   		Center.insertOne(data,function(err){
			   			if(err){
			   				console.log('insert centers error...')
			   			}else{

			   			}
			   		})
    			}	
			}
		})
		return 1;
	}
		
    },
    kmeans:function(persons){
	 	Center.findAll(function(err,centers){
	 		if(err){
	 			console.log('gg');
	 		}else{
	 			console.log(centers[5])
	 			var iter=500;
				var feature_number=2;
				var k=6;
				var x=0;
				var data=[];
				var i;
			    for( i=0;i<persons.length;i++){
				    data[i]=[];
				    data[i][0]=persons[i].evaluation*10;
				    data[i][1]=persons[i].salary;
				    data[i][2]=persons[i].times;
				    data[i][3]=-1;
				    data[i][4]=persons[i]._id;
				}
				var flag=0;

			  	while((x<iter)&&(!flag)){
			    	var centersTemp=[];
			    	for(let i=0;i<k;i++){
				    	centersTemp[i]={};
				    	centersTemp[i].x=centers[i].posX;
				    	centersTemp[i].y=centers[i].posY;
				    	centersTemp[i].z=centers[i].posZ;
			    	}
			    	for(let i=0;i<persons.length;i++){
			        	var dist=[];
			        	var min=10000000000;
			        	for(let j=0;j<k;j++){
			        		//dist[j]=0;
			            	dist[j]=Math.pow((Math.pow((data[i][0]-centers[j].posX),2)+Math.pow((data[i][1]-centers[j].posY),2)+Math.pow((data[i][2]-centers[j].posZ),2)),1/3);
			            	console.log(dist[j])
			            	if(min>dist[j]){
			                	min=dist[j];
			                	data[i][3]=j;
			            	}
			        	}
			    	}
			    	for(let j=0;j<k;j++){
			        	var num=0;
			        	var centerxSum=0;
			        	var centerySum=0;
			        	var centerzSum=0;
			        	for(let i=0;i<persons.length;i++){
			            	if(data[i][3]==j){
			               		centerxSum+=data[i][0];
			               		centerySum+=data[i][1];
			               		centerzSum+=data[i][2];
			               		num++;
			            	}
			        	}
			        	if(num>0){
			            	centers[j].posX=centerxSum/num;
			            	centers[j].posY=centerySum/num;
			            	centers[j].posZ=centerzSum/num;
			            	console.log("x="+centers[j].posX+"  y="+centers[j].posY+"  z="+centers[j].posZ);
			            	num=0;
			        	}
			    	}
			    	for(let j=0;j<k;j++){
			        	if((centersTemp[j].x==centers[j].posX)&&(centersTemp[j].y==centers[j].posY)&&(centersTemp[j].z==centers[j].posZ)){
			            	flag=1;
			        	}else{
			            	flag=0;
			        	}
			    	}
			    	x++;
				}
				console.log("次数=="+x);
				for(let i=0;i<persons.length;i++){
			   		 // console.log(data[i][3]);
			   		 Teacher.updateTeacher(data[i][4],{$set:{kind:data[i][3]}},function(err){
			   		 	if(err){
			   		 		console.log('updata teacher kind error')
			   		 	}else{
			   		 		
			   		 	}
			   		 })
				}
			   		console.log(data)
			   		Center.deleteAll(function(err){
			   			if(err){
			   				console.log('database error');
			   			}else{
			   				for(let j=0;j<6;j++){
			   					data.posX=centers[j].posX;
						   		data.posY=centers[j].posY;
						   		data.posZ=centers[j].posZ;
				   				Center.insertOne(data,function(err){
						   			if(err){
						   				console.log('insert centers error...')
						   			}else{
						   				console.log('insert success...')
						   			}
						   		})
				   			}
			   			}
			   		})   		
		    	}	
		    
	 	})
	 }
}