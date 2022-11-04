use neon::prelude::*;

// unicode word seperator (CJK friendly)
use unicode_segmentation::UnicodeSegmentation;
use regex::Regex;

fn word_count(mut cx: FunctionContext) -> JsResult<JsNumber> {
  let str = cx.argument::<JsString>(0)?;

  let content = str.value(&mut cx);
  let mut word_count = 0;
  // match links and files in grammar "[](...)"
  let link_re = Regex::new(r"\]\((.*?)\)").unwrap();

  // process document
  for line in content.lines() {
    let line = link_re.replace_all(&line, "]");
    let words: Vec<&str> = line.unicode_words().collect();
    word_count += words.len();
  }

  Ok(cx.number(word_count as f64))
}

#[neon::main]
fn main(mut cx: ModuleContext) -> NeonResult<()> {
  cx.export_function("wordCount", word_count)?;
  Ok(())
}
