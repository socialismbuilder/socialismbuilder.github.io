function preprocess(text) {
    text = text
    .replace(/\n+/g,'\n')//处理连续多个回车
    .replace(/(?<![\?\？\.\。!\！]) *\r?\n+ *(?![\(（]?[A-F0-9])/g,' ')//删除多余回车
    .replace(/(?<=[0-9]\.) *\n/g,'')
    .replace(/(?<!_) *[_\—] *(?!_)/g, ' ____ ')//下划线纠正
    .replace(/ ?____ ?/g, ' ____ ')//下划线纠正
    .replace(/ +/g,' ')//多个空格归一化
    return text;
}
function amend_Punctuation(text) {
    text = text
    .replace(/(?<=[\u4e00-\u9fa5][_\(\)（） ]*)[\.\．]/g,'。')
    .replace(/(?<=[\u4e00-\u9fa5][_\(\)（） ]*)\,/g,'，')
    .replace(/(?<=[\u4e00-\u9fa5][_\(\)（） ]*)\?/g,'？')
    .replace(/(?<=[\u4e00-\u9fa5][_\(\)（） ]*)\:/g,'：')
    .replace(/(?<=[\u4e00-\u9fa5][_\(\)（） ]*)\；/g,'；')
    .replace(/(?<=[\u4e00-\u9fa5][_\(\)（） ]*)\!/g,'！')
    .replace(/([\u4e00-\u9fa5][_\,\.\?\!\;，。？！；]*) *[\(（] *([\S]{0,50}) *[\)）] */g,'$1（$2）')//中文后的括号修正
    .replace(/ *（ *([\S]{0,50}) *\) */g,'($1)')//括号前后不一致的换成英文
    .replace(/ ?\(([0-9a-z]{0,2})\)\.? ?(?=[\u4e00-\u9fa5])/g, '（$1）')//中文里的序号括号换成中文
    .replace(/(?<=[a-zA-Z_]) *([,.!]) *(?=[a-zA-Z_])/g,'$1 ')//英文标点空格修正
    .replace(/( ?____ ?)(?=[A-Z])/g,' —')//半破号处理
    .replace(/[-]{2,}/g,' —')
    .replace(/ *([.,:?]) */g,'$1 ')//英文标点加空格
    .replace(/(?<=[0-9]) *\. *(?=[0-9])/g,'.')//小数点去空格
    .replace(/ *([\(（]) *([\S]{1,10}) *([\)）]) */g,' ($2) ')//括号修正
    return text;
}

function formatting(text) {
    text = text
    .replace(/(?<=[,.])\s+(?=")/g,'')//"good. "
    //.replace(/([\u4e00-\u9fa5]) *([\dA-Z]+) */g,'$1$2')//有 1 个
    .replace(/(?<=[\u4e00-\u9fa5，。？]) *([\dA-Z]+) */g,'$1')
    .replace(/(?<=\r?\n)([A-F]) ?(?=[\u4e00-\u9fa5])/gm,'$1. ')
    .replace(/([\n \)）])( *)([A-F0-9])( ?)[\.\．\。] */g,'$1$3. ')//A.或者1.
    .replace(/\([ 　]*\)[ 　]*/g,' (　) ')//(　)
    .replace(/(?<=[米次克吨斤秒分小平方度瓦千分厘毫微人])[、](?=[米秒毫克吨斤度瓦百千人])/g,'/')//米、秒
    .replace(/(?<=^ ?\(　\) )([0-9])*\. */g,'')
    .replace(/^[\u0028\uFF08]\d+[\u0029\uFF09]/g, '')
    .replace(/^[\d一二三四五六七八九十]+[\.\．、] */g, '')//删题号
    .replace(/[\(（] ?[0-9]{1,2} ?分 ?[\)）]/g,'')
    .replace(/ *([ap])\. *m. */g,' $1.m. ')
    .replace(/ *([0-2])?([0-9])\s?[:：]\s?([0-6])?([0-9]) */g,' $1$2:$3$4 ')
    return text;
}
function classified_process(text,selectedOption){
    switch(selectedOption) {
        case '不区分':
            break;
        case '语数':
            text = text
            .replace(/\!/g, '！')
            .replace(/\?/g, '？')
            .replace(/\,/g, '，')
            .replace(/(?<![A-F0-9])\./g, '。')
            .replace(/\:/g, '：')
            .replace(/\;/g, '；')
            .replace(/\(/g, '（')
            .replace(/\)/g, '）')
            .replace(/(?<=[0-9])。(?=[0-9])/g,'.')
            .replace(/([a-zA-z0-9]) *(?=[\u4e00-\u9fa5])/g,'$1')
            .replace(/(?<=[\u4e00-\u9fa5]) *([a-zA-z0-9])/g,'$1')
            .replace(/ ?____ ?/g,'____')
            .replace(/ ?([（）]) ?/g,'$1')
            break;
        case '英语':
            text = text
            .replace(/！/g, '!')
            .replace(/(?<![\u4e00-\u9fa5])？/g, '?')
            .replace(/(?<![\u4e00-\u9fa5])，/g, ',')
            .replace(/(?<![\u4e00-\u9fa5])。/g, '.')
            .replace(/：/g, ':')
            .replace(/；/g, ';')
            .replace(/（/g, '(')
            .replace(/）/g, ')')
            .replace(/[“”]/g, '"')
            .replace(/[’‘]/g, '\'')
            break;
        default:
            //setOutputText('请先选择处理方式');
    }
    return text;
}

function post_process(text) {
    text = text
    .replace(/ *([\,\.\?\!？。，！“])/g,'$1')//空格加标点，删除空格
    .replace(/^[ ]*/gm,'')//开头的空格全部去掉
    .replace(/[ ]*$/gm, '')//结尾的空格全去掉
    .replace(/(?<=[\u4e00-\u9fa5，：！。”“；（）])[ 　]]*/g,'')//汉字和汉语标点后的空格删除
    .replace(/ +/g,' ')//删除重复空格
    .replace(/ ([b-z]) (?=____)/g,' $1')
    .replace(/(?<=^\(　\) )([0-9])*\. */g,'')
    .replace(/ ?\/ ?/g,'/')
    return text;
}

function tex_process(text) {
    text = text
    .replace(/[\(（][\)）]/g,'(　)')
    .replace(/α/g,'\\alpha')
    .replace(/β/g,'\\beta')
    return text;
}