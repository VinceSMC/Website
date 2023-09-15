let changeLogSvg = $('[data-name="changelog-icon"]')


function clean_parse_html(){
    $('.w-richtext').children('p').each(function() {                
        if(this.innerHTML.indexOf('&lt;') == 0 && this.innerHTML.match(/&gt;$/) != null) {
          this.innerHTML = this.innerText.replace(/\u00A0/g, '');
					
        }      	
				if(!($(this).children().length > 0)){
					$(this).remove()
				}
    });
		
}
function insertSVG(){
		$('.changelog__item').each(function(){
				if(!($(this).children('[data-name="changelog-icon"]').length) ){
            $(this).prepend(changeLogSvg.clone())
        }
		})
		
		
}

clean_parse_html()
insertSVG()

window.fsAttributes = window.fsAttributes || [];
window.fsAttributes.push([
  'cmsload',
  (listInstances) => {
    
    const [listInstance] = listInstances;

    listInstance.on('renderitems', (renderedItems) => {
     	clean_parse_html()
      insertSVG()
    });
  },
]);
