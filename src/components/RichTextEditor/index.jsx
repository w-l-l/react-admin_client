import React, { Component } from 'react'
import { Editor } from 'react-draft-wysiwyg'
import { EditorState, convertToRaw } from 'draft-js'
import draftToHtml from 'draftjs-to-html'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

export default class RichTextEditor extends Component {
  state = {
    editorState: EditorState.createEmpty() // 创建一个没有内容的空对象
  }
  // 实时输入的回调
  onEditorStateChange = editorState => {
    this.setState({ editorState })
    this.getDetail()
  }
  // 获取详情内容
  getDetail = _ => draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
  render () {
    const { editorState } = this.state
    return (
      <div>
        <Editor
          editorState={editorState}
          editorStyle={{border: '1px solid', minHeight: 200, paddingLeft: 10}}
          onEditorStateChange={this.onEditorStateChange}
        />
      </div>
    )
  }
}
