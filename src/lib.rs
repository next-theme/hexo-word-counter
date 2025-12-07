use wasm_bindgen::prelude::*;

// unicode word seperator (CJK friendly)
use unicode_segmentation::UnicodeSegmentation;
use regex::Regex;

#[wasm_bindgen(js_name = wordCount)]
pub fn word_count(content: &str) -> f64 {
  let mut word_count = 0;
  // match links and files in grammar "[](...)"
  let link_re = Regex::new(r"\]\((.*?)\)").unwrap();

  // process document
  for line in content.lines() {
    let line = link_re.replace_all(&line, "]");
    let words: Vec<&str> = line.unicode_words().collect();
    word_count += words.len();
  }

  word_count as f64
}

