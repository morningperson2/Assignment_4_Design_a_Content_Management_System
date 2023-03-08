const albums={
	documentID:'1082851103720357888',
	index:function(){
		document.getElementById('albums').innerHTML='Loading albums, please wait...';
		database.index(albums.documentID,function(items){
			document.getElementById('albums').innerHTML='';
			for(let i=0;i<items.length;i++){
				let album=items[i];
				let el=document.createElement('div');
				el.innerHTML=`<div>
						<blockquote>
							<em><a href="detail.html?index=${i}">${album.album}</a></em>
						</blockquote>
						${album.band}
						<hr />
					</div>`;
				document.getElementById('albums').append(el);
			}
		});
	},
	detail:function(index){
		database.detail(albums.documentID,index,function(item){
			document.getElementById('loading').style.display='none';
			document.getElementById('album-band').innerText=item.band;
			document.getElementById('album-text').innerText=item.album;
			document.getElementById('btn-edit').setAttribute('href',`edit.html?index=${index}`);
			document.getElementById('btn-review').setAttribute('href',`review.html?index=${index}`);
							
			let deleteButton=document.getElementById('btn-delete');
			deleteButton.addEventListener('click',function(){
				database.delete(albums.documentID,index);
			});

			// loop through reviews array and create new HTML element for each review
			let reviewsDiv = document.getElementById('reviews');
			if (item.reviews) {
				for (let i = 0; i < item.reviews.length; i++) {
					let review = item.reviews[i];
					let reviewDiv = document.createElement('div');
					reviewDiv.innerHTML = `<p>${review.name}: ${review.text}</p>`;
					reviewsDiv.appendChild(reviewDiv);
				}
			}
		});
	},
	create:function(){
		document.querySelector('form').addEventListener('submit',function(e){
			e.preventDefault();
			let band=document.querySelector('form input[name=band]');
			let album=document.querySelector('form textarea[name=album]');
			let review = {
				"name":"",
				"review":""
			}
			let newAlbum={
				band:band.value,
				album:album.value,
				review:review.value
			}
			database.create(albums.documentID,newAlbum);
		});
	},
	update:function(index){
		database.detail(albums.documentID,index,function(item){
			document.getElementById('loading').style.display='none';
			document.querySelector('form input[name=band]').value=item.band;
			document.querySelector('form textarea[name=album]').value=item.album;
			
			document.querySelector('form').addEventListener('submit',function(e){
				e.preventDefault();
				let band=document.querySelector('form input[name=band]');
				let album=document.querySelector('form textarea[name=album]');
				let newAlbum={
					band:band.value,
					album:album.value
				}
				database.update(albums.documentID,index,newAlbum);
			});
		});
	},
	review: function(index) {
		database.detail(albums.documentID, index, function(item) {
		  console.log(item); // Log the entire 'item' object to the console
	  
		  document.getElementById('loading').style.display = 'none';
		  document.getElementById('album-band').innerText = item.band;
		  document.getElementById('album-text').innerText = item.album;
		  if (item.review) {
			document.querySelector('form input[name=name]').value = item.review.name;
			document.querySelector('form textarea[name=review]').value = item.review.text;
		  }
	  
		  document.querySelector('form').addEventListener('submit', function(e) {
			e.preventDefault();
			let band = item.band
			let album = item.album
			let name = document.querySelector('form input[name=name]');
			let review = document.querySelector('form textarea[name=review]');
			let newReview = {
			  name: name.value,
			  text: review.value
			}
			if (!item.reviews) {
			  item.reviews = []; // Create a new 'reviews' array if it doesn't exist
			}
			item.reviews.push(newReview); // Add the new review to the 'reviews' array
			let newAlbum = {
			  band: band,
			  album: album,
			  reviews: item.reviews // Use the updated 'reviews' array in the new album object
			}
			database.update(albums.documentID, index, newAlbum);
		  });
		});
	  }
	  
	  
	  
}