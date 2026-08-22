import re

with open('/home/c1ph3r/.config/quickshell/quickisland/shell.qml', 'r') as f:
    content = f.read()

new_ui = """
                                // 5. Frosted Glass Opacity
                                Item {
                                    width: parent.width; height: 32
                                    opacity: Settings.data.colorSchemes.hyprglassStyle === "frosted" ? 1.0 : 0.4
                                    Behavior on opacity { NumberAnimation { duration: 150 } }
                                    Text {
                                        text: "Glass Darkness"
                                        color: shell.textPrimary
                                        font.pixelSize: 11
                                        font.weight: Font.Bold
                                        anchors.left: parent.left
                                        anchors.verticalCenter: parent.verticalCenter
                                    }
                                    Row {
                                        anchors.right: parent.right
                                        anchors.verticalCenter: parent.verticalCenter
                                        spacing: 4

                                        Rectangle {
                                            width: 20; height: 26; radius: 4; color: shell.surfaceAlt
                                            Text { text: "-"; anchors.centerIn: parent; color: shell.textPrimary; font.pixelSize: 14; font.weight: Font.Bold }
                                            MouseArea {
                                                anchors.fill: parent; cursorShape: Qt.PointingHandCursor
                                                enabled: Settings.data.colorSchemes.hyprglassStyle === "frosted"
                                                onClicked: {
                                                    Settings.data.colorSchemes.frostedOpacity = Math.max(0.0, Settings.data.colorSchemes.frostedOpacity - 0.05);
                                                }
                                            }
                                        }

                                        Rectangle {
                                            width: 60; height: 26; radius: 6
                                            color: shell.surfaceBright
                                            Text {
                                                anchors.centerIn: parent
                                                text: Settings.data.colorSchemes.frostedOpacity.toFixed(2)
                                                color: shell.textPrimary; font.pixelSize: 11; font.family: "monospace"
                                            }
                                        }

                                        Rectangle {
                                            width: 20; height: 26; radius: 4; color: shell.surfaceAlt
                                            Text { text: "+"; anchors.centerIn: parent; color: shell.textPrimary; font.pixelSize: 14; font.weight: Font.Bold }
                                            MouseArea {
                                                anchors.fill: parent; cursorShape: Qt.PointingHandCursor
                                                enabled: Settings.data.colorSchemes.hyprglassStyle === "frosted"
                                                onClicked: {
                                                    Settings.data.colorSchemes.frostedOpacity = Math.min(1.0, Settings.data.colorSchemes.frostedOpacity + 0.05);
                                                }
                                            }
                                        }
                                    }
                                }

                                // 6. Dark Gradient Intensity
                                Item {
                                    width: parent.width; height: 32
                                    opacity: Settings.data.colorSchemes.hyprglassStyle === "frosted" ? 1.0 : 0.4
                                    Behavior on opacity { NumberAnimation { duration: 150 } }
                                    Text {
                                        text: "Gradient Darkness"
                                        color: shell.textPrimary
                                        font.pixelSize: 11
                                        font.weight: Font.Bold
                                        anchors.left: parent.left
                                        anchors.verticalCenter: parent.verticalCenter
                                    }
                                    Row {
                                        anchors.right: parent.right
                                        anchors.verticalCenter: parent.verticalCenter
                                        spacing: 4

                                        Rectangle {
                                            width: 20; height: 26; radius: 4; color: shell.surfaceAlt
                                            Text { text: "-"; anchors.centerIn: parent; color: shell.textPrimary; font.pixelSize: 14; font.weight: Font.Bold }
                                            MouseArea {
                                                anchors.fill: parent; cursorShape: Qt.PointingHandCursor
                                                enabled: Settings.data.colorSchemes.hyprglassStyle === "frosted"
                                                onClicked: {
                                                    Settings.data.colorSchemes.gradientOpacity = Math.max(0.0, Settings.data.colorSchemes.gradientOpacity - 0.05);
                                                }
                                            }
                                        }

                                        Rectangle {
                                            width: 60; height: 26; radius: 6
                                            color: shell.surfaceBright
                                            Text {
                                                anchors.centerIn: parent
                                                text: Settings.data.colorSchemes.gradientOpacity.toFixed(2)
                                                color: shell.textPrimary; font.pixelSize: 11; font.family: "monospace"
                                            }
                                        }

                                        Rectangle {
                                            width: 20; height: 26; radius: 4; color: shell.surfaceAlt
                                            Text { text: "+"; anchors.centerIn: parent; color: shell.textPrimary; font.pixelSize: 14; font.weight: Font.Bold }
                                            MouseArea {
                                                anchors.fill: parent; cursorShape: Qt.PointingHandCursor
                                                enabled: Settings.data.colorSchemes.hyprglassStyle === "frosted"
                                                onClicked: {
                                                    Settings.data.colorSchemes.gradientOpacity = Math.min(1.0, Settings.data.colorSchemes.gradientOpacity + 0.05);
                                                }
                                            }
                                        }
                                    }
                                }

                                // 7. Gradient Stop Position
                                Item {
                                    width: parent.width; height: 32
                                    opacity: Settings.data.colorSchemes.hyprglassStyle === "frosted" ? 1.0 : 0.4
                                    Behavior on opacity { NumberAnimation { duration: 150 } }
                                    Text {
                                        text: "Gradient Size/Stop"
                                        color: shell.textPrimary
                                        font.pixelSize: 11
                                        font.weight: Font.Bold
                                        anchors.left: parent.left
                                        anchors.verticalCenter: parent.verticalCenter
                                    }
                                    Row {
                                        anchors.right: parent.right
                                        anchors.verticalCenter: parent.verticalCenter
                                        spacing: 4

                                        Rectangle {
                                            width: 20; height: 26; radius: 4; color: shell.surfaceAlt
                                            Text { text: "-"; anchors.centerIn: parent; color: shell.textPrimary; font.pixelSize: 14; font.weight: Font.Bold }
                                            MouseArea {
                                                anchors.fill: parent; cursorShape: Qt.PointingHandCursor
                                                enabled: Settings.data.colorSchemes.hyprglassStyle === "frosted"
                                                onClicked: {
                                                    Settings.data.colorSchemes.gradientStop = Math.max(0.1, Settings.data.colorSchemes.gradientStop - 0.05);
                                                }
                                            }
                                        }

                                        Rectangle {
                                            width: 60; height: 26; radius: 6
                                            color: shell.surfaceBright
                                            Text {
                                                anchors.centerIn: parent
                                                text: Settings.data.colorSchemes.gradientStop.toFixed(2)
                                                color: shell.textPrimary; font.pixelSize: 11; font.family: "monospace"
                                            }
                                        }

                                        Rectangle {
                                            width: 20; height: 26; radius: 4; color: shell.surfaceAlt
                                            Text { text: "+"; anchors.centerIn: parent; color: shell.textPrimary; font.pixelSize: 14; font.weight: Font.Bold }
                                            MouseArea {
                                                anchors.fill: parent; cursorShape: Qt.PointingHandCursor
                                                enabled: Settings.data.colorSchemes.hyprglassStyle === "frosted"
                                                onClicked: {
                                                    Settings.data.colorSchemes.gradientStop = Math.min(1.0, Settings.data.colorSchemes.gradientStop + 0.05);
                                                }
                                            }
                                        }
                                    }
                                }

                                // 8. Gradient Orientation
                                Item {
                                    width: parent.width; height: 32
                                    opacity: Settings.data.colorSchemes.hyprglassStyle === "frosted" ? 1.0 : 0.4
                                    Behavior on opacity { NumberAnimation { duration: 150 } }
                                    Text {
                                        text: "Gradient Horizontal"
                                        color: shell.textPrimary
                                        font.pixelSize: 11
                                        font.weight: Font.Bold
                                        anchors.left: parent.left
                                        anchors.verticalCenter: parent.verticalCenter
                                    }
                                    
                                    Rectangle {
                                        width: 44; height: 24; radius: 12
                                        anchors.right: parent.right
                                        anchors.verticalCenter: parent.verticalCenter
                                        color: Settings.data.colorSchemes.gradientHorizontal ? shell.accent : shell.surfaceAlt
                                        Behavior on color { ColorAnimation { duration: 150 } }

                                        Rectangle {
                                            width: 20; height: 20; radius: 10
                                            anchors.verticalCenter: parent.verticalCenter
                                            x: Settings.data.colorSchemes.gradientHorizontal ? parent.width - width - 2 : 2
                                            color: "#ffffff"
                                            Behavior on x { NumberAnimation { duration: 150; easing.type: Easing.OutCubic } }
                                        }

                                        MouseArea {
                                            anchors.fill: parent; cursorShape: Qt.PointingHandCursor
                                            enabled: Settings.data.colorSchemes.hyprglassStyle === "frosted"
                                            onClicked: Settings.data.colorSchemes.gradientHorizontal = !Settings.data.colorSchemes.gradientHorizontal
                                        }
                                    }
                                }
"""

target = "                            // Reset Row"
if target in content:
    content = content.replace(target, new_ui + "\n" + target)
    with open('/home/c1ph3r/.config/quickshell/quickisland/shell.qml', 'w') as f:
        f.write(content)
    print("Patched successfully")
else:
    print("Could not find target")
