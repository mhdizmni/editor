import BulletList from '@tiptap/extension-bullet-list'

// 2. Overwrite the keyboard shortcuts
export const CustomBulletList = BulletList.extend({
  addKeyboardShortcuts() {
    return {
      'Mod-l': () => this.editor.commands.toggleBulletList(),
    }
  },
  onUpdate() {
console.log("test bull")
  },
})