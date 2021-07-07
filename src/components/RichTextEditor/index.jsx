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
  // 图片上传回调
  uploadCallback = file => new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open('POST', '/api/manage/img/upload')
    const data = new FormData()
    data.append('image', file)
    xhr.send(data)
    xhr.addEventListener('load', _ => {
      const res = JSON.parse(xhr.responseText)
      const { data: { url } } = res
      resolve({ data: { link: url } })
    })
    xhr.addEventListener('error', _ => {
      const error = JSON.parse(xhr.responseText)
      reject(error)
    })
  })
  render () {
    const { editorState } = this.state
    const { onEditorStateChange, uploadCallback } = this
    return (
      <div>
        <Editor
          editorState={editorState}
          editorStyle={{border: '1px solid', minHeight: 200, paddingLeft: 10}}
          onEditorStateChange={onEditorStateChange}
          toolbar={{
            image: { uploadCallback },
            alt: { present: true, mandatory: true }
          }}
        />
      </div>
    )
  }
}
