function initCodeBlock() {
    $(".docs__code-block").each(function(index) {
        let textArea = $(this).find(".code-editor")[0];
        let codeMode = "text/x-yaml";
        let copyButton = $(this).find(".copy-code");

        let editor = CodeMirror.fromTextArea(textArea, {
            mode: codeMode,
            theme: "default",
            lineNumbers: false,
            lineWrapping: false,
            readOnly: true
        });

        let highlightLines = $(textArea).data('highlight');
        if (highlightLines !== undefined) {
            highlightLines = String(highlightLines);
            try {
                highlightLines.split(',').map(s => parseInt(s.trim())).forEach(function(line) {
                    if (line <= editor.lineCount() && line > 0) {
                        editor.addLineClass(line - 1, 'background', 'highlighted-line');
                    } else {
                        console.error(`Invalid line number ${line} for highlighting. Editor has ${editor.lineCount()} lines.`);
                    }
                });
            } catch (error) {
                console.error('Error highlighting line:', error);
            }
        }

        let temp = $("<textarea>");
        copyButton.on("click", function() {
            $("body").append(temp);
            temp.val(editor.getValue()).select();
            document.execCommand("copy");
            temp.remove();
            showCopyPopup();
        });

        const tooltipElements = $(this).find('data-tooltip');
        tooltipElements.each(function() {
            const line = parseInt($(this).attr('line'));
            if (isNaN(line)) {
                console.error(`Invalid line attribute for tooltip: "${$(this).attr('line')}"`);
                return;
            }

            const totalLines = editor.lineCount();
            if (line > 0 && line <= totalLines) {
                const tooltipText = $(this).text().trim();
                const iconElement = createTooltipIconElement();
                editor.setBookmark({ line: line - 1, ch: Infinity }, { widget: iconElement });
                $(iconElement).hover(function(e) {
                    showTooltip(e, tooltipText);
                }, function() {
                    hideTooltip();
                });
            } else {
                console.error(`Invalid line number ${line} for tooltip. Editor has ${totalLines} lines.`);
            }
        });
    });
}

function showCopyPopup() {
    if ($(".copy-code-popup").length === 0) {
        $("body").append('<div class="copy-code-popup">Code copied!</div>');
    }

    const popup = $(".copy-code-popup");
    popup.addClass("show-popup");
    setTimeout(() => {
        popup.removeClass("show-popup");
    }, 3000);
}

function createTooltipIconElement() {
    let iconElement = document.createElement('span');
    iconElement.className = 'cm-tooltip-icon';
    iconElement.innerHTML = '<svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 16V12M12 8H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="CurrentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    return iconElement;
}

function processEmojiContent(content) {
    const emojiMap = {
        ':wave:': '👋',
        ':smile:': '😄',
        ':point_right:': '👉',
        ':note:': '🔸',
    };

    Object.keys(emojiMap).forEach(emojiCode => {
        const regex = new RegExp(emojiCode, 'g');
        content = content.replace(regex, emojiMap[emojiCode]);
    });
    return content;
}

function showTooltip(event, content) {
    let tooltip = $('<div class="cm-tooltip"></div>');
    let formattedContent = content
        .split('\n')
        .map(line => line.trim().replace(/^- "/, '').replace(/"$/, ''))
        .filter(line => line.length > 0)
        .map(line => {
            line = line.replace(/'(.+?)'/g, '<span class="is--code-wrapper is--tooltip">$1</span>');
            line = line.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
            return line;
        })
        .join('<br>');
    formattedContent = processEmojiContent(formattedContent);
    tooltip.html(formattedContent);
    $('body').append(tooltip);
    tooltip.css({
        top: event.pageY + 5,
        left: event.pageX + 5
    });
}

function hideTooltip() {
    $('.cm-tooltip').remove();
}

$(document).ready(function() {
    initCodeBlock();
});
