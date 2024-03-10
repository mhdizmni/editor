import { NodeViewWrapper, NodeViewContent } from '@tiptap/react'
// import { BlockHandleMenu } from '../../components/menus/block-handle/block-handle'

const View = () => {
  return (
    <NodeViewWrapper className="w-full flex gap-1 items-start justify-start">
      {/* <BlockHandleMenu editor={null} /> */}
      <NodeViewContent className="content" />
    </NodeViewWrapper>
  )
}
export default View