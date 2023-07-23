class SelectAreaClass {

    selectRow=-1 
    selectCol=-1 
    startCol=-1;
    startRow=-1;
    endCol=-1;
    endRow=-1;

    setSelect(i,j) {
        this.selectCol=i;
        this.selectRow=j;
        this.startRow=-1
        this.startCol=-1
        this.endRow=-1
        this.endCol=-1
    }
    setSelectArea(i,j) {
        if(this.selctRow==-1){
            this.setSelect(i,j)    
        }else{
            this.startRow=Math.min(i,this.selectRow)
            this.startCol=Math.min(j,this.selectCol)
            this.endRow=Math.max(i,this.selectRow)
            this.endCol=Math.max(j,this.selectCol)
        }
    }
    thereIsSelection(){
        return this.selectRow!=-1
    }
    getSelectArea(){
        if(this.endRow==-1)
            return [this.selectRow,this.selectCol,this.selectRow,this.selectCol]
        return [this.startRow ,this.startCol ,this.endRow, this.endCol]
    }
}

const selectArea = new SelectAreaClass();


function createTable() {
  const table = parseArray().map((row,i) => {
    const rowParse = row.map((cell,j) => {
      return `<td>${cell}</td>`;
    });
    return `<tr>${rowParse.join('')}</tr>`
  })
  return `<table>${table.join('')}</table>`;
}

function arraysEqual(a, b) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length !== b.length) return false;
  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

function setSelect(e,i,j){
    applayToSelect((e)=>{
        e.className=''
    })
    if(e.shiftKey){
       selectArea.setSelectArea(i,j) 
    }else{
       selectArea.setSelect(j,i) 
    }
    applayToSelect((e)=>{
        e.className='selectArea'
    })
}

function addTdEvent(){
    const btable=$('tbody')[0].children;
    for (let i = 0; i < btable.length; i++) {
        const row=btable[i].children;
        for (let j = 0; j < row.length; j++) {
            row[j].onclick=(e)=>setSelect(e,i,j)
        }
    }
}
function applayToSelect(apply){
    if(!selectArea.thereIsSelection()){
        return
    }
    const [startRow ,startCol ,endRow, endCol] = selectArea.getSelectArea();
    const btable=$('tbody')[0].children;
    for (let i = startRow; i < Math.min(btable.length,endRow+1); i++) {
        const row=btable[i].children;
        for (let j = startCol; j < Math.min(row.length,endCol+1); j++) {
            apply(row[j])
        }
    }
}

function parseArray() {
    const content = $('#parseTable').val();
    const rows = content.split('\n');
    const table = rows.map((row) => row.split('\t'))
    if( arraysEqual(table.at(-1),['']) || arraysEqual(table.at(-1),[])){
        table.pop(-1)
    }
    return table;
}

function setTitle(title, percentual) {
  $("#currentTitle").html(title);
}

function pageOne() {
  setTitle('Incollare La Tabella Da Excel')
  $('#previusPage').addClass('disabled');
  $('#nextPage').removeClass('disabled');
  $('#firstPage').show();
  $('#secondPage').hide();
}

function pageTwo() {
    setTitle('Modificare La Tabella')
    $('#nextPage').addClass('disabled');
    $('#previusPage').removeClass('disabled');
    $('#firstPage').hide();
    $('#secondPage').show();
    const table = createTable()
    drawTable(table);
}


function drawTable(table) {
    if(table==undefined){
        table=$('#containTable').html();
    }else{
        $('#containTable').html(table)
    }
    $('#copyarea').val(table)
    addTdEvent()
}

function addAttr(ele,map){
    for(const index in map){
        ele.attr(index,map[index])
    }
    drawTable()
}

function remAttr(ele,map){
    for(const index in map){
        ele.removeAttr(map[index])
    }
    drawTable()
}

function addBorder() {
    const ele =$('table');
    console.log(ele[0]['border'])
    if(ele[0]['border']=='')
        addAttr(ele,{'border':'1','cellspacing': '0'});
    else
        remAttr(ele,['border','cellspacing']);
}

function copyClipboard() {
  const val = $('#copyarea').val()
  navigator.clipboard.writeText(val);

  const copied = document.getElementById('copied');
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(copied)
  toastBootstrap.show()

}

function addWrappingEle(ele,wrap){
    const text=delWrappingEle(ele)
    ele.innerHTML=`<${wrap}>${text}</${wrap}>`

}
function delWrappingEle(ele){
    if(ele.children.length>0){
        const text=ele.children[0].innerHTML;
        ele.innerHTML=text;
        return text;
    }
    return ele.innerHTML;
}


function main() {
  $('#previusPage').on('click', pageOne);
  $('#nextPage').on('click', pageTwo);
  $('#setBorder').on('click', addBorder);
  $('#setRight').on('click', ()=>applayToSelect((e)=>e.setAttribute('align','right')));
  $('#setCenter').on('click', ()=>applayToSelect((e)=>e.setAttribute('align','center')));
  $('#setLeft').on('click', ()=>applayToSelect((e)=>e.setAttribute('align','left')));
  $('#setLeft').on('click', ()=>applayToSelect((e)=>e.setAttribute('align','left')));
  $('#setBg').on('click', ()=>applayToSelect((e)=>e.setAttribute('bgcolor',$('#colorBG').val())));
  $('#setBold').on('click', ()=>applayToSelect((e)=>addWrappingEle(e,'b')));
  $('#setUnFormat').on('click', ()=>applayToSelect((e)=>delWrappingEle(e)));
  for(let i=1;i<=5;i++){
    $(`#setH${i}`).on('click', ()=>applayToSelect((e)=>addWrappingEle(e,`h${i}`)));

  }
  $('#copy').on('click', copyClipboard);
  pageOne();
  pageTwo();
}

const a = "Numeric	Numeric-2	Numeric-Suffix \n" +
  "1	1	1st \n" +
  "2	2	2nd \n" +
  "3	3	3rd \n" +
  "4	4	4th \n" +
  "5	5	5th \n" +
  "6	6	6th \n" +
  "7	7	7th \n" +
  "8	8	8th \n" +
  "9	9	9th \n" +
  "10	10	10th \n" +
  "11	11	11th \n" +
  "12	12	12th \n" +
  "13	13	13th \n" +
  "14	14	14th \n" +
  "15	15	15th \n" +
  "16	16	16th \n" +
  "17	17	17th \n" +
  "18	18	18th \n" +
  "19	19	19th \n" +
  "20	20	20th \n" +
  "21	21	21st \n" +
  "22	22	22nd \n" +
  "23	23	23rd \n" +
  "24	24	24th \n" +
  "25	25	25th \n" +
  "26	26	26th \n" +
  "27	27	27th \n" +
  "28	28	28th \n" +
  "29	29	29th \n" +
  "30	30	30th \n" +
  "31	31	31st \n";

$("#parseTable").val(a);

main()
  
