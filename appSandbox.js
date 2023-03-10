const albums={
    documentID:'1082851103720357888',
    index:function(){
        document.getElementById('albums').innerHTML='<p class="white">Loading albums, please wait...</p>';
        database.index(albums.documentID,function(items){
            document.getElementById('albums').innerHTML='';
            for(let i=0;i<items.length;i+=2){
                console.log(i);
                let albumEven = items[i];
                let even = document.createElement('div');
                even.style.backgroundColor='#FF4365';
                even.innerHTML =`<blockquote>
							<a href="detail.html?index=${i}"><text style="color:black">${albumEven.album}</text></a>
						</blockquote>
						<em>${albumEven.band}</em>`;
                document.getElementById('albums').append(even);

                let x = i + 1;
                console.log(x);
                let albumOdd = items[x];
                let odd = document.createElement('div');
                odd.style.backgroundColor='#00D9C0';
                odd.innerHTML =`<blockquote>
							<a href="detail.html?index=${i}"><text style="color:black">${albumOdd.album}</text></a>
						</blockquote>
						<em>${albumOdd.band}</em>`;
                document.getElementById('albums').append(odd);
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
    review:function(index){
        database.detail(albums.documentID,index,function(item){
            document.getElementById('loading').style.display='none';
            document.getElementById('album-band').innerText=item.band;
            document.getElementById('album-text').innerText=item.album;
            document.querySelector('form input[name=name]').value=item.review.name;
            document.querySelector('form textarea[name=review]').value=item.review.text;

            document.querySelector('form').addEventListener('submit',function(e){
                e.preventDefault();
                let band=document.querySelector('form input[name=band]');
                let album=document.querySelector('form textarea[name=album]');
                let name=document.querySelector('form input[name=name]');
                let review=document.querySelector('form textarea[name=review]');
                let newReview={
                    name:name.value,
                    review:review.value
                }
                let newAlbum={
                    band:band.value,
                    album:album.value,
                    review:newReview.value
                }
                database.update(albums.documentID,index,newAlbum);
            });
        });
    }
}