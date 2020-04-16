/**
 * @license
 * Visual Blocks Editor
 *
 * Copyright 2016 Massachusetts Institute of Technology
 * All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

goog.provide('Blockly.Blocks.bukkit');

goog.require('Blockly.Blocks');

Blockly.Blocks['evnt_onjoin'] = {
    /**
     * Block for when a player joins.
     * @this Blockly.Block
     */
    init: function() {
      this.jsonInit({
        "message0": Blockly.Msg.EVNT_ONJOIN,
        "category": Blockly.Categories.bukkit,
        "extensions": ["colours_bukkit", "shape_hat"]
      });
    }
  
  };

Blockly.Blocks['func_sendmessage'] = {
    /**
     * Block to send a message.
     * @this Blockly.Block
     */
    init: function() {
      this.jsonInit({
        "id": "func_sendmessage",
        "message0": Blockly.Msg.FUNC_SENDMESSAGE,
        "args0": [
          {
            "type": "input_value",
            "name": "MESSAGE"
          }
        ],
        "category": Blockly.Categories.bukkit,
        "extensions": ["colours_bukkit", "shape_statement"]
      });
    }
};