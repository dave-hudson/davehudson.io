import {CodeFragment} from '../../lib/code-fragments';
import {h, VElement} from '../../lib/dvdi';
import {NotesPost} from '../NotesPost';

function notesOpening_2025_08_14(): VElement[] {
    return [
        h('p', {},
            'Notes on Humbug development including extending the mindspace view with expandable sections ' +
            'and profiling performance bottlenecks in the file view.'
        )
    ];
}

function notesArticle_2025_08_14(): VElement[] {
    return [
        h('section', {},
            h('h2', {}, 'Extending the mindspace view'),
            h('p', {},
                'Continued working on the mindspace view.'
            ),
            h('p', {},
                'Modified the new view sections so they have expanders that allow their respective trees to be expanded or collapsed. ' +
                'By making this change I was able to make the section heading act like the root directory and thus support a context ' +
                'menu. This in turn meant the top-level folder could be removed from each section, giving back one row per section, but ' +
                'also one entire level of horizontal indentation. This reduces the screen real estate for the trees and makes them ' +
                'easier to use.'
            )
        ),
        h('section', {},
            h('h2', {}, 'Profiling a performance bottleneck'),
            h('p', {},
                'I\'d planned to remove the "sort by creation date" feature from the file view anyway, but realized this was suddenly ' +
                'taking a huge amount of time to handle initial expansion of parts of the files tree.'
            ),
            h('p', {},
                'The following code snippet was useful as it triggered 2 seconds of profiling, started by the tree expand signal:'
            ),
            CodeFragment.create({
                code: 'import cProfile\n' +
                    'profiler = cProfile.Profile()\n\n' +
                    'def _stop_profiling(self) -> None:\n' +
                    '    """Stop profiling the tree view."""\n' +
                    '    self.profiler.disable()\n' +
                    '    self.profiler.print_stats(sort="time")\n\n' +
                    'def _tree_expanded(self, index: QModelIndex) -> None:\n' +
                    '    """Handle tree expansion events."""\n' +
                    '    print("Tree expanded:", index.data())\n' +
                    '    timer = QTimer(self)\n' +
                    '    timer.setSingleShot(True)\n' +
                    '    timer.timeout.connect(self._stop_profiling)\n' +
                    '    timer.start(2000)\n' +
                    '    self.profiler.enable()',
                language: 'Python',
                caption: 'Profiling code for tree expansion events'
            }),
            h('p', {},
                'This provided a smoking gun around JSON parsing:'
            ),
            CodeFragment.create({
                code: 'Ordered by: internal time\n\n' +
                    'ncalls  tottime  percall  cumtime  percall filename:lineno(function)\n' +
                    '  6086    2.327    0.000    2.327    0.000 decoder.py:351(raw_decode)\n' +
                    '  6086    0.140    0.000    0.267    0.000 {method \'read\' of \'_io.TextIOWrapper\' objects}\n' +
                    '  6086    0.126    0.000    0.126    0.000 {built-in method _codecs.utf_8_decode}\n' +
                    '  6086    0.047    0.000    0.049    0.000 {built-in method _io.open}\n' +
                    '  6086    0.047    0.000    2.744    0.000 mindspace_files_model.py:157(_get_file_creation_time)\n' +
                    ' 51/15    0.019    0.000    2.791    0.186 {function HumbugApplication.notify at 0x108d94cc0}\n' +
                    '  6086    0.009    0.000    2.681    0.000 mindspace_files_model.py:112(_get_conversation_timestamp)\n' +
                    '  3158    0.009    0.000    2.765    0.001 mindspace_files_model.py:210(lessThan)\n' +
                    '  6086    0.006    0.000    0.006    0.000 {method \'__exit__\' of \'_io._IOBase\' objects}\n' +
                    ' 12402    0.005    0.000    0.010    0.000 mindspace_files_model.py:77(_is_in_conversations_hierarchy)\n' +
                    '  6086    0.005    0.000    2.336    0.000 decoder.py:340(decode)\n' +
                    '  6480    0.005    0.000    0.005    0.000 {method \'filePath\' of \'PySide6.QtWidgets.QFileSystemModel\' objects}\n' +
                    '  6086    0.004    0.000    2.611    0.000 __init__.py:274(load)\n' +
                    ' 24804    0.004    0.000    0.004    0.000 {built-in method posix._path_normpath}\n' +
                    '    45    0.004    0.000    0.004    0.000 {function MindspaceFilesDelegate.paint at 0x108cca160}\n' +
                    '  6086    0.003    0.000    0.016    0.000 mindspace_files_model.py:95(_is_conversation_file)\n' +
                    '  6086    0.003    0.000    2.340    0.000 __init__.py:299(loads)\n' +
                    '  6152    0.003    0.000    0.007    0.000 <frozen posixpath>:117(splitext)\n' +
                    '  6086    0.003    0.000    0.003    0.000 {method \'timestamp\' of \'datetime.datetime\' objects}\n' +
                    '  6152    0.002    0.000    0.004    0.000 <frozen genericpath>:157(_splitext)\n' +
                    ' 30740    0.002    0.000    0.002    0.000 {built-in method builtins.isinstance}\n' +
                    ' 12172    0.002    0.000    0.002    0.000 {method \'match\' of \'re.Pattern\' objects}\n' +
                    '  6086    0.002    0.000    0.127    0.000 <frozen codecs>:322(decode)',
                language: 'Text',
                caption: 'Profiling output showing JSON parsing bottleneck'
            }),
            h('p', {},
                'Implemented a simple caching solution for the conversations view and now applications load times have dramatically ' +
                'reduced! Looks like they\'re now several hundred ms faster.'
            )
        )
    ];
}

export const notesPost_2025_08_14 = new NotesPost(
    '2025-08-14: Humbug development',
    '2025-08-14',
    '/notes/2025-08-14',
    '2025-08-14: Notes on Humbug development including extending the mindspace view with expandable sections and profiling performance bottlenecks in the file view.',
    null,
    null,
    notesOpening_2025_08_14,
    notesArticle_2025_08_14,
    null
);
