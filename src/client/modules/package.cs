package
{
   import flash.display.*;
   import flash.events.*;
   import flash.filters.*;
   import flash.geom.*;
   import flash.net.*;
   import flash.text.*;
   import flash.ui.*;
   import flash.utils.*;
   import flash.xml.*;
   
   public class xmessage extends Sprite
   {
      
      internal static var mspos:*;
      
      internal static var SkipSmilies:*;
      
      internal static var yc2:*;
      
      public static var xPos:*;
      
      public static var ImInit:*;
      
      public static var SmB:*;
      
      internal static var Ronce:*;
      
      internal static var useryc:Number = 0;
      
      internal static var DeleteNumber:Number;
      
      public static var useryc2:* = 0;
      
      public static var useryc3:* = 0;
      
      public static var poin:*;
      
      public static var McCnt:* = 0;
      
      public static var McTot:* = 0;
      
      public static var p:*;
      
      public static var NoOfM:int;
      
      private static var LastUserTab:int;
      
      public static var Social:*;
      
      private static var keywords:*;
      
      private static var FirstC:*;
      
      §§push(xmessage);
      if(false)
      {
         return;
      }
      §§push(§§findproperty(mspos));
      §§push(undefined);
      if(false)
      {
         5;
         §§pop();
         §§pop();
      }
      else
      {
         §§pop().mspos = §§pop();
      }
      §§push(§§findproperty(useryc));
      §§push(0);
      if(false)
      {
         5;
         §§pop();
         §§pop();
      }
      else
      {
         §§pop().useryc = §§pop();
      }
      §§push(§§findproperty(useryc2));
      §§push(0);
      if(false)
      {
         5;
         §§pop();
         §§pop();
      }
      else
      {
         §§pop().useryc2 = §§pop();
      }
      §§push(§§findproperty(useryc3));
      §§push(0);
      if(false)
      {
         5;
         §§pop();
         §§pop();
      }
      else
      {
         §§pop().useryc3 = §§pop();
      }
      §§push(§§findproperty(poin));
      §§push(new Array());
      if(false)
      {
         5;
         §§pop();
         §§pop();
      }
      else
      {
         §§pop().poin = §§pop();
      }
      §§push(§§findproperty(McCnt));
      §§push(0);
      if(false)
      {
         5;
         §§pop();
         §§pop();
      }
      else
      {
         §§pop().McCnt = §§pop();
      }
      §§push(§§findproperty(McTot));
      §§push(0);
      if(false)
      {
         5;
         §§pop();
         §§pop();
      }
      else
      {
         §§pop().McTot = §§pop();
      }
      §§push(§§findproperty(Social));
      §§push({"tc":0});
      if(false)
      {
         5;
         §§pop();
         §§pop();
      }
      else
      {
         §§pop().Social = §§pop();
      }
      §§push(§§findproperty(keywords));
      §§push({
         "wiki":"wiki",
         "twitter":"twitter",
         "search":"search",
         "power":"powers",
         "powers":"powers",
         "register":"profile",
         "login":"profile",
         "relogin":"profile",
         "donate":"donate",
         "buy":"donate",
         "coin":"donate",
         "coins":"donate",
         "coins":"donate",
         "xats":"donate",
         "trade":"trade",
         "subscriber":"donate",
         "support":"support",
         "gift":8
      });
      if(false)
      {
         5;
         §§pop();
         §§pop();
      }
      else
      {
         §§pop().keywords = §§pop();
      }
      
      public function xmessage()
      {
         §§push(this);
         if(false)
         {
            return;
         }
         super();
      }
      
      public static function AddGames() : *
      {
         §§push(xmessage);
         if(false)
         {
            return;
         }
         var _loc1_:* = undefined;
         for(_loc1_ in xconst.Game)
         {
            §§push(keywords);
            §§push(xconst.Game[_loc1_]);
            §§push(60001 + _loc1_);
            if(false)
            {
               5;
               §§pop();
               §§pop();
               §§pop();
            }
            else
            {
               §§pop()[§§pop()] = §§pop();
            }
         }
      }
      
      public static function UpdateMessages(param1:Boolean, param2:Boolean) : *
      {
         §§push(xmessage);
         if(false)
         {
            return;
         }
         var _loc3_:* = undefined;
         var _loc4_:* = null;
         var _loc5_:* = NaN;
         var _loc6_:* = undefined;
         var _loc7_:* = undefined;
         var _loc8_:* = undefined;
         var _loc9_:* = undefined;
         var _loc10_:* = undefined;
         var _loc11_:* = undefined;
         var _loc12_:* = undefined;
         var _loc13_:* = undefined;
         var _loc14_:* = undefined;
         var _loc15_:* = undefined;
         var _loc16_:* = undefined;
         var _loc17_:* = undefined;
         var _loc18_:* = undefined;
         var _loc19_:* = undefined;
         var _loc20_:* = undefined;
         var _loc21_:* = undefined;
         var _loc22_:* = undefined;
         var _loc23_:* = undefined;
         var _loc24_:* = undefined;
         var _loc25_:* = param1;
         var _loc26_:* = param2;
         try
         {
            if(_loc26_ == undefined)
            {
               _loc26_ = false;
            }
            _loc6_ = todo.Message.length;
            _loc7_ = main.ctabsmc.TabIsPrivate();
            _loc8_ = main.ctabsmc.TabUser();
            if(!_loc26_ || !p)
            {
               §§push(§§findproperty(p));
               §§push(new Array());
               if(false)
               {
                  5;
                  §§pop();
                  §§pop();
               }
               else
               {
                  §§pop().p = §§pop();
               }
               §§push(§§findproperty(NoOfM));
               §§push(0);
               if(false)
               {
                  5;
                  §§pop();
                  §§pop();
               }
               else
               {
                  §§pop().NoOfM = §§pop();
               }
               _loc14_ = 0;
               while(_loc14_ < _loc6_)
               {
                  _loc18_ = todo.Message[_loc14_];
                  if(_loc26_ == false)
                  {
                     §§push(_loc18_);
                     §§push(false);
                     if(false)
                     {
                        5;
                        §§pop();
                        §§pop();
                     }
                     else
                     {
                        §§pop().New = §§pop();
                     }
                  }
                  if(_loc18_.New == false && _loc18_.ignored != true)
                  {
                     if(_loc7_)
                     {
                        if((_loc8_ == _loc18_.u || todo.w_userno == _loc18_.u) && _loc18_.d == _loc8_)
                        {
                           var _loc27_:* = §§findproperty(NoOfM);
                           var _loc28_:* = _loc27_.NoOfM + 1;
                           §§push(_loc27_);
                           §§push(_loc28_);
                           if(false)
                           {
                              5;
                              §§pop();
                              §§pop();
                           }
                           else
                           {
                              §§pop().NoOfM = §§pop();
                           }
                           §§push(p);
                           §§push(_loc14_);
                           if(false)
                           {
                              5;
                              §§pop();
                              §§pop();
                           }
                           else
                           {
                              §§pop().push(§§pop());
                           }
                        }
                     }
                     else if((_loc18_.s & 2) == 0)
                     {
                        _loc27_ = §§findproperty(NoOfM);
                        _loc28_ = _loc27_.NoOfM + 1;
                        §§push(_loc27_);
                        §§push(_loc28_);
                        if(false)
                        {
                           5;
                           §§pop();
                           §§pop();
                        }
                        else
                        {
                           §§pop().NoOfM = §§pop();
                        }
                        §§push(p);
                        §§push(_loc14_);
                        if(false)
                        {
                           5;
                           §§pop();
                           §§pop();
                        }
                        else
                        {
                           §§pop().push(§§pop());
                        }
                     }
                  }
                  if(_loc18_.mc)
                  {
                     §§push(_loc18_.mc);
                     §§push(false);
                     if(false)
                     {
                        5;
                        §§pop();
                        §§pop();
                     }
                     else
                     {
                        §§pop().visible = §§pop();
                     }
                  }
                  _loc14_ += 1;
               }
            }
            else
            {
               _loc10_ = p.length;
               _loc14_ = 0;
               while(_loc14_ < _loc10_)
               {
                  if(todo.Message[p[_loc14_]].mc)
                  {
                     §§push(todo.Message[p[_loc14_]].mc);
                     §§push(false);
                     if(false)
                     {
                        5;
                        §§pop();
                        §§pop();
                     }
                     else
                     {
                        §§pop().visible = §§pop();
                     }
                  }
                  _loc14_ += 1;
               }
            }
            _loc9_ = Math.round(todo.tph / 35) - 2;
            if(_loc9_ < 0)
            {
               _loc9_ = 0;
            }
            _loc10_ = (NoOfM - _loc9_) * 100;
            if(_loc10_ <= 0)
            {
               _loc10_ = 100;
            }
            §§push(main.mscrollmc);
            §§push(_loc10_);
            if(false)
            {
               5;
               §§pop();
               §§pop();
            }
            else
            {
               §§pop().Scr_size = §§pop();
            }
            if(todo.ScrollDown && _loc26_ == false)
            {
               §§push(main.mscrollmc);
               §§push(main.mscrollmc.Scr_size);
               if(false)
               {
                  5;
                  §§pop();
                  §§pop();
               }
               else
               {
                  §§pop().position = §§pop();
               }
               §§push(todo);
               §§push(false);
               if(false)
               {
                  5;
                  §§pop();
                  §§pop();
               }
               else
               {
                  §§pop().ScrollDown = §§pop();
               }
            }
            if(mspos == undefined || !_loc26_)
            {
               §§push(§§findproperty(mspos));
               §§push(main.mscrollmc.Scr_position);
               if(false)
               {
                  5;
                  §§pop();
                  §§pop();
               }
               else
               {
                  §§pop().mspos = §§pop();
               }
               §§push(todo);
               §§push(false);
               if(false)
               {
                  5;
                  §§pop();
                  §§pop();
               }
               else
               {
                  §§pop().DoUpdateMessages = §§pop();
               }
            }
            else
            {
               §§push(§§findproperty(mspos));
               §§push((mspos + main.mscrollmc.Scr_position) / 2);
               if(false)
               {
                  5;
                  §§pop();
                  §§pop();
               }
               else
               {
                  §§pop().mspos = §§pop();
               }
               _loc19_ = Math.abs(mspos - main.mscrollmc.Scr_position);
               if(_loc19_ < 10)
               {
                  §§push(§§findproperty(mspos));
                  §§push(main.mscrollmc.Scr_position);
                  if(false)
                  {
                     5;
                     §§pop();
                     §§pop();
                  }
                  else
                  {
                     §§pop().mspos = §§pop();
                  }
                  §§push(todo);
                  §§push(false);
                  if(false)
                  {
                     5;
                     §§pop();
                     §§pop();
                  }
                  else
                  {
                     §§pop().DoUpdateMessages = §§pop();
                  }
               }
               §§push(§§findproperty(SkipSmilies));
               §§push(_loc26_);
               if(false)
               {
                  5;
                  §§pop();
                  §§pop();
               }
               else
               {
                  §§pop().SkipSmilies = §§pop();
               }
            }
            _loc11_ = _loc9_ - 0.001 + (NoOfM - _loc9_) * (mspos / main.mscrollmc.Scr_size);
            if(_loc11_ < 0)
            {
               _loc11_ = 0;
            }
            if(_loc11_ >= NoOfM - 0.001)
            {
               _loc11_ = NoOfM - 0.001;
            }
            _loc12_ = _loc11_ - int(_loc11_);
            _loc14_ = _loc13_ = int(_loc11_);
            §§push(§§findproperty(yc2));
            §§push(0);
            if(false)
            {
               5;
               §§pop();
               §§pop();
            }
            else
            {
               §§pop().yc2 = §§pop();
            }
            _loc15_ = NoOfM;
            _loc16_ = 99;
            while(_loc15_ > 0)
            {
               _loc15_--;
               _loc20_ = _loc14_;
               _loc14_--;
               if(_loc20_ < 0)
               {
                  _loc20_ = int(_loc11_) - _loc20_;
               }
               if(p[_loc20_] != undefined)
               {
                  _loc18_ = todo.Message[p[_loc20_]];
                  if(_loc18_)
                  {
                     _loc21_ = xatlib.FindUser(_loc18_.u);
                     if(_loc21_ == -1 && _loc18_.u != 0)
                     {
                        §§push(§§findproperty(DeleteOneMessageMc));
                        §§push(p[_loc20_]);
                        if(false)
                        {
                           5;
                           §§pop();
                           §§pop();
                        }
                        else
                        {
                           §§pop().DeleteOneMessageMc(§§pop());
                        }
                        §§push(p);
                        §§push(_loc20_);
                        §§push(undefined);
                        if(false)
                        {
                           5;
                           §§pop();
                           §§pop();
                           §§pop();
                        }
                        else
                        {
                           §§pop()[§§pop()] = §§pop();
                        }
                     }
                     else
                     {
                        §§push(§§findproperty(DeleteNumber));
                        §§push(xatlib.xInt(_loc18_.n));
                        if(false)
                        {
                           5;
                           §§pop();
                           §§pop();
                        }
                        else
                        {
                           §§pop().DeleteNumber = §§pop();
                        }
                        if(_loc14_ < -1)
                        {
                           _loc13_ += 1;
                        }
                        if(_loc18_.mc != undefined)
                        {
                           _loc22_ = _loc18_.mc.mch;
                           §§push(§§findproperty(yc2));
                           §§push(yc2 + _loc22_);
                           if(false)
                           {
                              5;
                              §§pop();
                              §§pop();
                           }
                           else
                           {
                              §§pop().yc2 = §§pop();
                           }
                        }
                        else
                        {
                           if(_loc18_.u == 0)
                           {
                              _loc3_ = -1;
                              _loc4_ = xconst.ST(14);
                              _loc5_ = 0;
                           }
                           else
                           {
                              _loc3_ = xatlib.CleanAv(todo.Users[_loc21_].a);
                              _loc4_ = todo.Users[_loc21_].n;
                              if(_loc4_.substr(0,1) == "$")
                              {
                                 _loc4_ = _loc4_.substr(1);
                              }
                              _loc23_ = "";
                              if(todo.Users[_loc21_].u != 0)
                              {
                                 _loc23_ = "<l>";
                              }
                              _loc4_ = _loc23_ + "<c> " + _loc23_ + _loc4_;
                              if(Boolean(todo.Users[_loc21_].h) && todo.Users[_loc21_].h.length > 6)
                              {
                                 _loc4_ += " <ho>";
                              }
                              if((todo.w_owner || todo.w_moderator) && _loc18_.n != 0 && _loc18_.n != 1 && !_loc18_.p)
                              {
                                 _loc4_ += " <del>";
                              }
                              _loc5_ = 0;
                           }
                           §§push(§§findproperty(AddMessageToList));
                           §§push(_loc3_);
                           §§push(_loc4_);
                           §§push(_loc5_);
                           §§push(p[_loc20_]);
                           §§push(_loc21_);
                           if(false)
                           {
                              5;
                              §§pop();
                              §§pop();
                              §§pop();
                              §§pop();
                              §§pop();
                              §§pop();
                           }
                           else
                           {
                              §§pop().AddMessageToList(§§pop(),§§pop(),§§pop(),§§pop(),§§pop());
                           }
                           §§push(_loc18_.mc);
                           §§push(false);
                           if(false)
                           {
                              5;
                              §§pop();
                              §§pop();
                           }
                           else
                           {
                              §§pop().visible = §§pop();
                           }
                        }
                        if(Boolean(todo.Message[p[_loc13_]].mc) && yc2 - todo.Message[p[_loc13_]].mc.mch * (1 - _loc12_) > todo.tph)
                        {
                           _loc16_ = 0;
                           break;
                        }
                     }
                  }
               }
            }
            if(yc2 >= todo.tph)
            {
               _loc24_ = todo.tph - (_loc12_ - 1) * todo.Message[p[int(_loc11_)]].mc.mch;
               _loc24_ = _loc24_ - 4;
               _loc17_ = int(_loc11_);
               while(_loc17_ >= 0)
               {
                  if(p[_loc17_] != undefined)
                  {
                     _loc18_ = todo.Message[p[_loc17_]];
                     if(_loc18_.mc)
                     {
                        if(_loc18_.mc.mch != undefined)
                        {
                           _loc24_ -= _loc18_.mc.mch;
                        }
                        if(_loc18_.mc.mch == undefined || _loc24_ < -_loc18_.mc.mch)
                        {
                           break;
                        }
                        §§push(_loc18_.mc);
                        §§push(_loc24_);
                        if(false)
                        {
                           5;
                           §§pop();
                           §§pop();
                        }
                        else
                        {
                           §§pop().y = §§pop();
                        }
                        §§push(_loc18_.mc);
                        §§push(true);
                        if(false)
                        {
                           5;
                           §§pop();
                           §§pop();
                        }
                        else
                        {
                           §§pop().visible = §§pop();
                        }
                     }
                  }
                  _loc17_--;
               }
            }
            else
            {
               _loc24_ = 0;
               _loc17_ = 0;
               while(_loc17_ < NoOfM)
               {
                  if(p[_loc17_] != undefined)
                  {
                     _loc18_ = todo.Message[p[_loc17_]].mc;
                     if(_loc24_ > todo.tph || _loc24_ == undefined || !_loc18_)
                     {
                        break;
                     }
                     §§push(_loc18_);
                     §§push(_loc24_);
                     if(false)
                     {
                        5;
                        §§pop();
                        §§pop();
                     }
                     else
                     {
                        §§pop().y = §§pop();
                     }
                     §§push(_loc18_);
                     §§push(true);
                     if(false)
                     {
                        5;
                        §§pop();
                        §§pop();
                     }
                     else
                     {
                        §§pop().visible = §§pop();
                     }
                     _loc24_ += _loc18_.mch;
                  }
                  _loc17_ += 1;
               }
            }
            _loc17_ = 0;
            while(_loc17_ < _loc6_)
            {
               if(todo.Message[_loc17_].mc != undefined && todo.Message[_loc17_].mc.visible == false)
               {
                  §§push(§§findproperty(DeleteOneMessageMc));
                  §§push(_loc17_);
                  if(false)
                  {
                     5;
                     §§pop();
                     §§pop();
                  }
                  else
                  {
                     §§pop().DeleteOneMessageMc(§§pop());
                  }
               }
               _loc17_ += 1;
            }
            §§push(§§findproperty(SkipSmilies));
            §§push(false);
            if(false)
            {
               5;
               §§pop();
               §§pop();
            }
            else
            {
               §§pop().SkipSmilies = §§pop();
            }
         }
         catch(e:Error)
         {
         }
      }
      
      public static function DeleteOneMessageMc(param1:*) : *
      {
         §§push(xmessage);
         if(false)
         {
            return;
         }
         var _loc2_:* = todo.Message[param1].mc;
         if(!_loc2_)
         {
            return;
         }
         var _loc3_:* = §§findproperty(McCnt);
         var _loc4_:* = _loc3_.McCnt - 1;
         §§push(_loc3_);
         §§push(_loc4_);
         if(false)
         {
            5;
            §§pop();
            §§pop();
         }
         else
         {
            §§pop().McCnt = §§pop();
         }
         if(Boolean(_loc2_.avc) && Boolean(_loc2_.avc.parent))
         {
            §§push(_loc2_.avc.parent);
            §§push(_loc2_.avc);
            if(false)
            {
               5;
               §§pop();
               §§pop();
            }
            else
            {
               §§pop().removeChild(§§pop());
            }
            §§push(_loc2_);
            §§push(undefined);
            if(false)
            {
               5;
               §§pop();
               §§pop();
            }
            else
            {
               §§pop().avc = §§pop();
            }
         }
         if(_loc2_.parent)
         {
            §§push(_loc2_.parent);
            §§push(_loc2_);
            if(false)
            {
               5;
               §§pop();
               §§pop();
            }
            else
            {
               §§pop().removeChild(§§pop());
            }
         }
         §§push(todo.Message[param1]);
         §§push(undefined);
         if(false)
         {
            5;
            §§pop();
            §§pop();
         }
         else
         {
            §§pop().mc = §§pop();
         }
      }
      
      public static function NameCol(param1:int, param2:* = 103) : *
      {
         §§push(xmessage);
         if(false)
         {
            return;
         }
         var _loc3_:* = undefined;
         var _loc4_:int = 0;
         if(param1 == -1)
         {
            return [undefined,undefined];
         }
         if(param2 == 103)
         {
            _loc3_ = todo.Users[param1].n.split("(glow");
            _loc3_ = _loc3_[1];
            if(_loc3_)
            {
               _loc3_ = _loc3_.split(")");
               _loc3_ = _loc3_[0].split("#");
            }
         }
         else
         {
            _loc3_ = todo.Users[param1].s.split("#");
         }
         var _loc5_:* = undefined;
         var _loc6_:* = undefined;
         if(_loc3_ is Array)
         {
            _loc4_ = todo.Users[param1].Powers ? int(todo.Users[param1].Powers[0]) : 0;
            if(_loc3_[1] !== "0")
            {
               if(_loc3_[1])
               {
                  _loc6_ = xatlib.DecodeColor(_loc3_[1],_loc4_ & 0x2000 ? true : false,_loc4_ & 0x4000 ? true : false,_loc4_ & 0x8000 ? true : false,_loc4_ & 0x010000 ? true : false);
               }
               else
               {
                  _loc6_ = 65280;
               }
            }
            if(todo.HasPower(param1,param2))
            {
               if(_loc3_[2])
               {
                  _loc5_ = xatlib.DecodeColor(_loc3_[2],_loc4_ & 0x2000 ? true : false,_loc4_ & 0x4000 ? true : false,_loc4_ & 0x8000 ? true : false,_loc4_ & 0x010000 ? true : false);
               }
               else
               {
                  _loc5_ = 128;
               }
            }
         }
         return [_loc5_,_loc6_];
      }
      
      public static function AddMessageToList(param1:*, param2:String, param3:Number, param4:Number, param5:Number) : *
      {
         var _arg1:*;
         var _arg2:String;
         var _arg3:Number;
         var _arg4:Number;
         var _arg5:Number;
         var u:*;
         var h:*;
         var Press:*;
         var t:*;
         var z:*;
         var t2:*;
         var w:*;
         var m:*;
         var WordsLength:*;
         var Avatar:*;
         var UserName:*;
         var DeleteOk:*;
         var v:*;
         var userid:*;
         var M:*;
         var yinc:*;
         var Avw:*;
         var uid:*;
         var myuid:*;
         var a:*;
         var namec:*;
         §§push(xmessage);
         if(false)
         {
            return;
         }
         u = undefined;
         _arg1 = param1;
         _arg2 = param2;
         _arg3 = param3;
         _arg4 = param4;
         _arg5 = param5;
         u = undefined;
         h = null;
         Press = undefined;
         t = undefined;
         z = undefined;
         t2 = undefined;
         w = undefined;
         m = undefined;
         WordsLength = undefined;
         Avatar = _arg1;
         UserName = _arg2;
         DeleteOk = _arg3;
         v = _arg4;
         userid = _arg5;
         M = todo.Message[v].t;
         u = todo.Message[v].u;
         yinc = 0;
         Avw = new MovieClip();
         §§push(main.mctextbackground);
         §§push(Avw);
         if(false)
         {
            5;
            §§pop();
            §§pop();
         }
         else
         {
            §§pop().addChild(§§pop());
         }
         §§push(Avw);
         §§push(5);
         if(false)
         {
            5;
            §§pop();
            §§pop();
         }
         else
         {
            §§pop().x = §§pop();
         }
         if(todo.w_userno == u)
         {
            h = xconst.ST(140);
            Press = function():*
            {
               §§push(main);
               if(false)
               {
                  return;
               }
               §§push(§§pop().hint);
               if(false)
               {
                  5;
                  §§pop();
               }
               else
               {
                  §§pop().HintOff();
               }
               §§push(chat.mainDlg);
               §§push(todo.w_userno);
               if(false)
               {
                  5;
                  §§pop();
                  §§pop();
               }
               else
               {
                  §§pop().GotoProfile(§§pop());
               }
            };
         }
         else if(u == 0)
         {
            h = xconst.ST(14);
            Press = function():*
            {
               §§push(main);
               if(false)
               {
                  return;
               }
               §§push(§§pop().hint);
               if(false)
               {
                  5;
                  §§pop();
               }
               else
               {
                  §§pop().HintOff();
               }
               §§push(main);
               §§push(5);
               §§push(0);
               if(false)
               {
                  5;
                  §§pop();
                  §§pop();
                  §§pop();
               }
               else
               {
                  §§pop().openDialog(§§pop(),§§pop());
               }
            };
         }
         else
         {
            h = xconst.ST(140);
            Press = function():*
            {
               §§push(chat);
               if(false)
               {
                  return;
               }
               if(§§pop().isKeyDown(Keyboard.SHIFT))
               {
                  §§push(§§findproperty(PressUserName));
                  §§push(u);
                  if(false)
                  {
                     5;
                     §§pop();
                     §§pop();
                  }
                  else
                  {
                     §§pop().PressUserName(§§pop());
                  }
               }
               else
               {
                  §§push(chat.mainDlg);
                  §§push(u);
                  if(false)
                  {
                     5;
                     §§pop();
                     §§pop();
                  }
                  else
                  {
                     §§pop().GotoProfile(§§pop());
                  }
               }
            };
         }
         uid = xatlib.FindUser(u);
         myuid = xatlib.FindUser(todo.w_userno);
         a = Avw;
         §§push(a);
         §§push(40);
         if(false)
         {
            5;
            §§pop();
            §§pop();
         }
         else
         {
            §§pop().x = §§pop();
         }
         namec = [];
         if(todo.HasPower(uid,21))
         {
            namec = NameCol(uid);
         }
         if(todo.w_userno == u && todo.Users[uid].w == 176)
         {
            M = xatlib.ReversePower(M);
         }
         §§push(todo);
         §§push((u + todo.w_useroom & 0xFFFF) + xatlib.ChkSum(M));
         if(false)
         {
            5;
            §§pop();
            §§pop();
         }
         else
         {
            §§pop().Random = §§pop();
         }
         yinc = AddMessageToMc(a,0,UserName,0,main.textPaneWidth,0,u,userid,namec[0],namec[1],todo.Message[v].pb);
         §§push(todo);
         §§push(todo.Random ^ 0x5555);
         if(false)
         {
            5;
            §§pop();
            §§pop();
         }
         else
         {
            §§pop().Random = §§pop();
         }
         yinc += AddMessageToMc(a,1,M,0,main.textPaneWidth,yinc,u);
         if(yinc < 35)
         {
            yinc = 35;
         }
         if(todo.HasPower(uid,209) && !todo.Message[v].action)
         {
            M = M.toLowerCase();
            M = M.split(" ");
            WordsLength = M.length;
            m = 0;
            while(m < WordsLength)
            {
               w = M[m];
               if(w.charAt(0) == "(")
               {
                  w = w.substr(1).split(")");
                  w = w[0];
                  w = w.split("#");
                  w = w[0];
               }
               if(xconst.ActionTable[w])
               {
                  §§push(todo.Message[v]);
                  §§push(xconst.ActionNames[xconst.ActionTable[w]]);
                  if(false)
                  {
                     5;
                     §§pop();
                     §§pop();
                  }
                  else
                  {
                     §§pop().action = §§pop();
                  }
                  break;
               }
               m += 1;
            }
         }
         if(uid >= 0)
         {
            §§push(Avw);
            §§push(new xAvatar(Avw,Avatar,h,Press,uid,todo.Message[v].action));
            if(false)
            {
               5;
               §§pop();
               §§pop();
            }
            else
            {
               §§pop().avc = §§pop();
            }
         }
         else
         {
            §§push(Avw);
            §§push(new xAvatar(Avw,Avatar,h,Press));
            if(false)
            {
               5;
               §§pop();
               §§pop();
            }
            else
            {
               §§pop().avc = §§pop();
            }
         }
         §§push(Avw.avc.Av);
         §§push(-35);
         if(false)
         {
            5;
            §§pop();
            §§pop();
         }
         else
         {
            §§pop().x = §§pop();
         }
         §§push(Avw.avc.Av);
         §§push(5);
         if(false)
         {
            5;
            §§pop();
            §§pop();
         }
         else
         {
            §§pop().y = §§pop();
         }
         §§push(Avw.avc.Av);
         §§push(h);
         if(false)
         {
            5;
            §§pop();
            §§pop();
         }
         else
         {
            §§pop().h = §§pop();
         }
         §§push(Avw.avc.Av);
         §§push((todo.HasPower(uid,4) || todo.HasPowerA(todo.w_Powers,4)) && !todo.bThin);
         if(false)
         {
            5;
            §§pop();
            §§pop();
         }
         else
         {
            §§pop().Zm = §§pop();
         }
         §§push(Avw.avc.Av);
         §§push(MouseEvent.ROLL_OVER);
         §§push(Av_onRollOver);
         if(false)
         {
            5;
            §§pop();
            §§pop();
            §§pop();
         }
         else
         {
            §§pop().addEventListener(§§pop(),§§pop());
         }
         §§push(Avw.avc.Av);
         §§push(MouseEvent.ROLL_OUT);
         §§push(Av_onRollOut);
         if(false)
         {
            5;
            §§pop();
            §§pop();
            §§pop();
         }
         else
         {
            §§pop().addEventListener(§§pop(),§§pop());
         }
         §§push(Avw.avc.Av);
         §§push(MouseEvent.MOUSE_UP);
         §§push(Av_onRollOut);
         if(false)
         {
            5;
            §§pop();
            §§pop();
            §§pop();
         }
         else
         {
            §§pop().addEventListener(§§pop(),§§pop());
         }
         §§push(todo.Message[v]);
         §§push(Avw);
         if(false)
         {
            5;
            §§pop();
            §§pop();
         }
         else
         {
            §§pop().mc = §§pop();
         }
         §§push(todo.Message[v].mc);
         §§push(yinc + 4);
         if(false)
         {
            5;
            §§pop();
            §§pop();
         }
         else
         {
            §§pop().mch = §§pop();
         }
         §§push(§§findproperty(yc2));
         §§push(yc2 + (yinc + 4));
         if(false)
         {
            5;
            §§pop();
            §§pop();
         }
         else
         {
            §§pop().yc2 = §§pop();
         }
      }
      
      internal static function Av_onRollOver(param1:MouseEvent) : *
      {
         §§push(xmessage);
         if(false)
         {
            return;
         }
         var _loc2_:* = param1.currentTarget;
         §§push(main.hint);
         §§push(0);
         §§push(0);
         §§push(_loc2_.h);
         §§push(true);
         §§push(0);
         §§push(undefined);
         §§push(0);
         §§push(_loc2_);
         if(false)
         {
            5;
            §§pop();
            §§pop();
            §§pop();
            §§pop();
            §§pop();
            §§pop();
            §§pop();
            §§pop();
            §§pop();
         }
         else
         {
            §§pop().Hint(§§pop(),§§pop(),§§pop(),§§pop(),§§pop(),§§pop(),§§pop(),§§pop());
         }
         if(!_loc2_.Zm)
         {
            return;
         }
         §§push(_loc2_);
         §§push(2.67);
         if(false)
         {
            5;
            §§pop();
            §§pop();
         }
         else
         {
            §§pop().scaleX = §§pop();
         }
         §§push(_loc2_);
         §§push(2.67);
         if(false)
         {
            5;
            §§pop();
            §§pop();
         }
         else
         {
            §§pop().scaleY = §§pop();
         }
         §§push(_loc2_);
         §§push(-20);
         if(false)
         {
            5;
            §§pop();
            §§pop();
         }
         else
         {
            §§pop().y = §§pop();
         }
         §§push(_loc2_.parent.parent);
         §§push(_loc2_.parent);
         §§push(_loc2_.parent.parent.numChildren - 1);
         if(false)
         {
            5;
            §§pop();
            §§pop();
            §§pop();
         }
         else
         {
            §§pop().setChildIndex(§§pop(),§§pop());
         }
         if(_loc2_.g)
         {
            §§push(_loc2_.g);
            §§push(false);
            if(false)
            {
               5;
               §§pop();
               §§pop();
            }
            else
            {
               §§pop().visible = §§pop();
            }
         }
         §§push(_loc2_);
         §§push(MouseEvent.MOUSE_MOVE);
         §§push(Av_tick);
         if(false)
         {
            5;
            §§pop();
            §§pop();
            §§pop();
         }
         else
         {
            §§pop().addEventListener(§§pop(),§§pop());
         }
      }
      
      internal static function Av_onRollOut(param1:*) : *
      {
         §§push(xmessage);
         if(false)
         {
            return;
         }
         var _loc2_:* = param1.currentTarget;
         §§push(_loc2_);
         §§push(1);
         if(false)
         {
            5;
            §§pop();
            §§pop();
         }
         else
         {
            §§pop().scaleX = §§pop();
         }
         §§push(_loc2_);
         §§push(1);
         if(false)
         {
            5;
            §§pop();
            §§pop();
         }
         else
         {
            §§pop().scaleY = §§pop();
         }
         §§push(_loc2_);
         §§push(5);
         if(false)
         {
            5;
            §§pop();
            §§pop();
         }
         else
         {
            §§pop().y = §§pop();
         }
         if(_loc2_.g)
         {
            §§push(_loc2_.g);
            §§push(true);
            if(false)
            {
               5;
               §§pop();
               §§pop();
            }
            else
            {
               §§pop().visible = §§pop();
            }
         }
         §§push(main.hint);
         if(false)
         {
            5;
            §§pop();
         }
         else
         {
            §§pop().HintOff();
         }
         §§push(_loc2_);
         §§push(MouseEvent.MOUSE_MOVE);
         §§push(Av_tick);
         if(false)
         {
            5;
            §§pop();
            §§pop();
            §§pop();
         }
         else
         {
            §§pop().removeEventListener(§§pop(),§§pop());
         }
      }
      
      internal static function Av_tick(param1:*) : *
      {
         §§push(xmessage);
         if(false)
         {
            return;
         }
         if(param1.stageX > 99 || param1.stageX < 6)
         {
            §§push(§§findproperty(Av_onRollOut));
            §§push(param1);
            if(false)
            {
               5;
               §§pop();
               §§pop();
            }
            else
            {
               §§pop().Av_onRollOut(§§pop());
            }
         }
      }
      
      internal static function DoRandom(param1:*, param2:*) : *
      {
         §§push(xmessage);
         if(false)
         {
            return;
         }
         var _loc3_:* = undefined;
         var _loc4_:* = undefined;
         var _loc5_:* = undefined;
         var _loc6_:* = undefined;
         var _loc7_:* = undefined;
         var _loc8_:int = 0;
         var _loc9_:* = undefined;
         var _loc10_:* = undefined;
         var _loc11_:* = undefined;
         var _loc12_:* = undefined;
         if(param1.charAt(param1.length - 1) !== ")")
         {
            return param1;
         }
         var _loc13_:* = param1.split("random");
         var _loc14_:* = _loc13_[0];
         if(!todo.Users[param2].RandomA)
         {
            §§push(todo.Users[param2]);
            var _loc15_:*;
            §§push(_loc15_ = new Object());
            if(false)
            {
               5;
               §§pop();
               §§pop();
            }
            else
            {
               §§pop().RandomA = §§pop();
            }
            _loc12_ = _loc15_;
            §§push(_loc12_);
            §§push(1);
            §§push(_loc15_ = new Array());
            if(false)
            {
               5;
               §§pop();
               §§pop();
               §§pop();
            }
            else
            {
               §§pop()[§§pop()] = §§pop();
            }
            _loc4_ = _loc15_;
            _loc3_ = todo.Users[param2].Powers;
            _loc8_ = int(xconst.smia.length);
            _loc6_ = 0;
            while(_loc6_ < _loc8_)
            {
               _loc5_ = xconst.smia[_loc6_];
               if(xatlib.SmOk(_loc5_,_loc3_))
               {
                  if(_loc5_ !== "127")
                  {
                     §§push(_loc4_);
                     §§push(_loc5_);
                     if(false)
                     {
                        5;
                        §§pop();
                        §§pop();
                     }
                     else
                     {
                        §§pop().push(§§pop());
                     }
                  }
               }
               _loc6_++;
            }
            §§push(_loc12_[1]);
            if(false)
            {
               5;
               §§pop();
            }
            else
            {
               §§pop().sort();
            }
         }
         _loc12_ = todo.Users[param2].RandomA;
         _loc7_ = 1;
         while(_loc7_ < _loc13_.length)
         {
            _loc9_ = 0;
            _loc5_ = _loc13_[_loc7_].charAt(0);
            if(_loc5_ !== ")" && _loc5_ !== "#")
            {
               _loc5_ = _loc13_[_loc7_].split("#",2);
               if(_loc5_[1] == undefined)
               {
                  _loc5_ = _loc13_[_loc7_].split(")",2);
                  _loc6_ = _loc5_[0];
                  §§push(_loc13_);
                  §§push(_loc7_);
                  §§push(")");
                  if(false)
                  {
                     5;
                     §§pop();
                     §§pop();
                     §§pop();
                  }
                  else
                  {
                     §§pop()[§§pop()] = §§pop();
                  }
               }
               else
               {
                  _loc6_ = _loc5_[0];
                  §§push(_loc13_);
                  §§push(_loc7_);
                  §§push("#" + _loc5_[1]);
                  if(false)
                  {
                     5;
                     §§pop();
                     §§pop();
                     §§pop();
                  }
                  else
                  {
                     §§pop()[§§pop()] = §§pop();
                  }
               }
               _loc11_ = xconst.pssh[_loc6_];
               if((_loc11_) && xatlib.SmOk(_loc6_,todo.Users[param2].Powers))
               {
                  _loc10_ = _loc12_[_loc6_];
                  if(!_loc10_)
                  {
                     _loc10_ = new Array();
                     _loc8_ = int(_loc12_[1].length);
                     _loc5_ = 0;
                     while(_loc5_ < _loc8_)
                     {
                        if(xconst.topsh[_loc12_[1][_loc5_]] == _loc11_)
                        {
                           §§push(_loc10_);
                           §§push(_loc12_[1][_loc5_]);
                           if(false)
                           {
                              5;
                              §§pop();
                              §§pop();
                           }
                           else
                           {
                              §§pop().push(§§pop());
                           }
                        }
                        _loc5_++;
                     }
                     §§push(_loc12_);
                     §§push(_loc6_);
                     §§push(_loc10_);
                     if(false)
                     {
                        5;
                        §§pop();
                        §§pop();
                        §§pop();
                     }
                     else
                     {
                        §§pop()[§§pop()] = §§pop();
                     }
                  }
                  _loc9_ = _loc10_[todo.Random % _loc10_.length];
               }
            }
            _loc6_ = _loc12_[1].length;
            if(!_loc9_)
            {
               _loc9_ = _loc12_[1][todo.Random % _loc6_];
            }
            _loc14_ += _loc9_ + _loc13_[_loc7_];
            §§push(todo);
            §§push(todo.Random + (_loc14_.length % 10 + (_loc6_ >> 1)));
            if(false)
            {
               5;
               §§pop();
               §§pop();
            }
            else
            {
               §§pop().Random = §§pop();
            }
            _loc7_++;
         }
         return _loc14_;
      }
      
      public static function AddMessageToMc(param1:*, param2:Number, param3:String, param4:Number, param5:Number, param6:Number, param7:Number = NaN, param8:* = undefined, param9:* = undefined, param10:* = undefined, param11:* = undefined) : Number
      {
         var _arg1:*;
         var _arg2:Number;
         var _arg3:String;
         var _arg4:Number;
         var _arg5:Number;
         var _arg6:Number;
         var _arg7:Number;
         var _arg8:*;
         var _arg9:*;
         var _arg10:*;
         var _arg11:*;
         var SwearWord:*;
         var HasRandom:*;
         var mcFmt:*;
         var SmilieBan:*;
         var mc:*;
         var Chatter:*;
         var LocData:*;
         var LocFunc:*;
         var HotLink:*;
         var HotLink2:*;
         var HotLink3:*;
         var s:*;
         var c0:*;
         var Sm:*;
         var ts:*;
         var key:*;
         var mcTxt:*;
         var t:*;
         var WordWidth:*;
         var c3:*;
         var f:*;
         var mc2:*;
         var mcTxt2:*;
         var schrs:*;
         var n2:*;
         var m2:*;
         var mcin:*;
         var id:*;
         var str:*;
         var Left:*;
         var Right:*;
         var yOfst:*;
         var UserNo:Number;
         var userid:*;
         var color:*;
         var glowc:*;
         var NameHint:*;
         var Width:*;
         var yPos:*;
         var LineH:*;
         var LinkNextWord:*;
         var sLinkNextWord:*;
         var uid:*;
         var mcFmtSize:*;
         var Space:*;
         var SCnt:*;
         var HomeX:*;
         var Words:*;
         var n:*;
         var _local13:*;
         §§push(xmessage);
         if(false)
         {
            return;
         }
         key = undefined;
         _local13 = undefined;
         _arg1 = param1;
         _arg2 = param2;
         _arg3 = param3;
         _arg4 = param4;
         _arg5 = param5;
         _arg6 = param6;
         _arg7 = param7;
         _arg8 = param8;
         _arg9 = param9;
         _arg10 = param10;
         _arg11 = param11;
         SwearWord = undefined;
         HasRandom = undefined;
         mcFmt = null;
         SmilieBan = undefined;
         mc = undefined;
         Chatter = null;
         LocData = undefined;
         LocFunc = undefined;
         HotLink = undefined;
         HotLink2 = undefined;
         HotLink3 = undefined;
         s = null;
         c0 = null;
         Sm = undefined;
         ts = undefined;
         key = undefined;
         mcTxt = undefined;
         t = undefined;
         WordWidth = undefined;
         c3 = undefined;
         f = NaN;
         mc2 = undefined;
         mcTxt2 = undefined;
         schrs = undefined;
         n2 = undefined;
         m2 = undefined;
         mcin = _arg1;
         id = _arg2;
         str = _arg3;
         Left = _arg4;
         Right = _arg5;
         yOfst = _arg6;
         UserNo = _arg7;
         userid = _arg8;
         color = _arg9;
         glowc = _arg10;
         NameHint = _arg11;
         if(color == undefined)
         {
            color = 0;
         }
         Width = Right - Left;
         §§push(§§findproperty(xPos));
         §§push(Left);
         if(false)
         {
            5;
            §§pop();
            §§pop();
         }
         else
         {
            §§pop().xPos = §§pop();
         }
         yPos = 0;
         LineH = 16;
         LinkNextWord = false;
         sLinkNextWord = false;
         mcFmt = new TextFormat();
         §§push(mcFmt);
         §§push("left");
         if(false)
         {
            5;
            §§pop();
            §§pop();
         }
         else
         {
            §§pop().align = §§pop();
         }
         §§push(mcFmt);
         §§push((id & 1) != 0);
         if(false)
         {
            5;
            §§pop();
            §§pop();
         }
         else
         {
            §§pop().bold = §§pop();
         }
         if(id == 4)
         {
            id = 1;
         }
         if(id == 1 && UserNo == 0)
         {
            §§push(mcFmt);
            §§push(true);
            if(false)
            {
               5;
               §§pop();
               §§pop();
            }
            else
            {
               §§pop().italic = §§pop();
            }
         }
         uid = xatlib.FindUser(UserNo);
         if(uid >= 0)
         {
            HasRandom = todo.HasPower(uid,272);
         }
         if(id == 1 && uid >= 0 && todo.Users[uid].w == 184)
         {
            SmilieBan = true;
         }
         §§push(mcFmt);
         §§push("_sans");
         if(false)
         {
            5;
            §§pop();
            §§pop();
         }
         else
         {
            §§pop().font = §§pop();
         }
         mcFmtSize = 14;
         §§push(mcFmt);
         §§push(mcFmtSize);
         if(false)
         {
            5;
            §§pop();
            §§pop();
         }
         else
         {
            §§pop().size = §§pop();
         }
         Space = int(mcFmtSize * 0.4);
         SCnt = 0;
         HomeX = 0;
         Words = new Array();
         Words = str.split(" ");
         if(xconst.ST(85) == "RTL")
         {
            §§push(Words);
            if(false)
            {
               5;
               §§pop();
            }
            else
            {
               §§pop().reverse();
            }
         }
         §§push(mcin);
         §§push(false);
         if(false)
         {
            5;
            §§pop();
            §§pop();
         }
         else
         {
            §§pop().mouseEnabled = §§pop();
         }
         §§push(mcin);
         §§push("");
         if(false)
         {
            5;
            §§pop();
            §§pop();
         }
         else
         {
            §§pop().t = §§pop();
         }
         §§push(mcin);
         §§push(UserNo);
         if(false)
         {
            5;
            §§pop();
            §§pop();
         }
         else
         {
            §§pop().u = §§pop();
         }
         if(glowc != undefined)
         {
            if(todo.bThin)
            {
               §§push(mcin);
               §§push(glowc);
               if(false)
               {
                  5;
                  §§pop();
                  §§pop();
               }
               else
               {
                  §§pop().Glow = §§pop();
               }
            }
            else
            {
               §§push(mcin);
               §§push(new Array());
               if(false)
               {
                  5;
                  §§pop();
                  §§pop();
               }
               else
               {
                  §§pop().glowa = §§pop();
               }
               §§push(mcin);
               §§push(new GlowFilter(glowc,0.7,3,3,3,3,false,false));
               if(false)
               {
                  5;
                  §§pop();
                  §§pop();
               }
               else
               {
                  §§pop().glowf = §§pop();
               }
               §§push(mcin.glowa);
               §§push(mcin.glowf);
               if(false)
               {
                  5;
                  §§pop();
                  §§pop();
               }
               else
               {
                  §§pop().push(§§pop());
               }
            }
         }
         n = 0;
         for(; n < Words.length; n += 1)
         {
            if(Right == 1999 && xPos > main.upw - 20)
            {
               break;
            }
            LocData = undefined;
            LocFunc = undefined;
            HotLink = undefined;
            HotLink2 = undefined;
            HotLink3 = undefined;
            §§push(mcFmt);
            §§push(color);
            if(false)
            {
               5;
               §§pop();
               §§pop();
            }
            else
            {
               §§pop().color = §§pop();
            }
            s = Words[n].toLowerCase();
            c0 = s.charAt(0);
            mc = mcin;
            §§push(mcFmt);
            §§push("");
            if(false)
            {
               5;
               §§pop();
               §§pop();
            }
            else
            {
               §§pop().url = §§pop();
            }
            if(!(id & 2))
            {
               §§push(mcFmt);
               §§push(false);
               if(false)
               {
                  5;
                  §§pop();
                  §§pop();
               }
               else
               {
                  §§pop().underline = §§pop();
               }
            }
            SwearWord = 0;
            if(c0 == "<")
            {
               c3 = s.charAt(1);
               if(c3 == "l")
               {
                  sLinkNextWord = true;
                  §§push(Words);
                  §§push(n);
                  §§push(Words[n].substr(3));
                  if(false)
                  {
                     5;
                     §§pop();
                     §§pop();
                     §§pop();
                  }
                  else
                  {
                     §§pop()[§§pop()] = §§pop();
                  }
                  s = Words[n].toLowerCase();
                  c0 = s.charAt(0);
               }
               if(c3 == "s")
               {
                  SwearWord = s.charAt(2);
                  §§push(Words);
                  §§push(n);
                  §§push(Words[n].substr(4));
                  if(false)
                  {
                     5;
                     §§pop();
                     §§pop();
                     §§pop();
                  }
                  else
                  {
                     §§pop()[§§pop()] = §§pop();
                  }
                  s = Words[n].toLowerCase();
                  c0 = s.charAt(0);
               }
               if(s == "<b>" || s == "</b>")
               {
                  §§push(mcFmt);
                  §§push(true);
                  if(false)
                  {
                     5;
                     §§pop();
                     §§pop();
                  }
                  else
                  {
                     §§pop().bold = §§pop();
                  }
                  continue;
               }
            }
            LinkNextWord = sLinkNextWord;
            if(!SmilieBan)
            {
            }
            if(xPos < Right || c0 != "(")
            {
               if(HasRandom && Boolean(s.indexOf("random")))
               {
                  §§push(Words);
                  §§push(n);
                  §§push(DoRandom(Words[n],uid));
                  if(false)
                  {
                     5;
                     §§pop();
                     §§pop();
                     §§pop();
                  }
                  else
                  {
                     §§pop()[§§pop()] = §§pop();
                  }
                  s = Words[n].toLowerCase();
               }
               Sm = Smilie(mc,s,UserNo,userid,id,Words[n]);
            }
            if(!SmilieBan)
            {
            }
            if(c0 == "_")
            {
               §§push(Words);
               §§push(n);
               §§push(Words[n].substr(1));
               if(false)
               {
                  5;
                  §§pop();
                  §§pop();
                  §§pop();
               }
               else
               {
                  §§pop()[§§pop()] = §§pop();
               }
            }
            if(Sm)
            {
               SCnt += 1;
               Chatter = undefined;
               if(Sm.Flags != 1 && SCnt > 10 && UserNo > 101)
               {
                  §§push(mc);
                  §§push(Sm);
                  if(false)
                  {
                     5;
                     §§pop();
                     §§pop();
                  }
                  else
                  {
                     §§pop().removeChild(§§pop());
                  }
               }
               else
               {
                  §§push(Sm);
                  §§push(xPos + xatlib.xInt(Sm.x));
                  if(false)
                  {
                     5;
                     §§pop();
                     §§pop();
                  }
                  else
                  {
                     §§pop().x = §§pop();
                  }
                  §§push(Sm);
                  §§push(Sm.y + (yPos + yOfst + 3));
                  if(false)
                  {
                     5;
                     §§pop();
                     §§pop();
                  }
                  else
                  {
                     §§pop().y = §§pop();
                  }
                  §§push(§§findproperty(xPos));
                  §§push(xPos + 20);
                  if(false)
                  {
                     5;
                     §§pop();
                     §§pop();
                  }
                  else
                  {
                     §§pop().xPos = §§pop();
                  }
                  if(Sm.Flags == 1)
                  {
                     §§push(§§findproperty(xPos));
                     §§push(xPos - 5);
                     if(false)
                     {
                        5;
                        §§pop();
                        §§pop();
                     }
                     else
                     {
                        §§pop().xPos = §§pop();
                     }
                     if(xPos > Right - 10)
                     {
                        if(HomeX)
                        {
                           HomeX -= 14;
                           §§push(Sm);
                           §§push(HomeX);
                           if(false)
                           {
                              5;
                              §§pop();
                              §§pop();
                           }
                           else
                           {
                              §§pop().x = §§pop();
                           }
                        }
                        else
                        {
                           §§push(Sm);
                           §§push(Sm.x - (xPos - Right));
                           if(false)
                           {
                              5;
                              §§pop();
                              §§pop();
                           }
                           else
                           {
                              §§pop().x = §§pop();
                           }
                           §§push(Sm);
                           §§push(Sm.x - 14);
                           if(false)
                           {
                              5;
                              §§pop();
                              §§pop();
                           }
                           else
                           {
                              §§pop().x = §§pop();
                           }
                           HomeX = Sm.x;
                        }
                     }
                     else if(HomeX == 0)
                     {
                        HomeX = xPos;
                     }
                  }
                  if(Sm.Flags == 2)
                  {
                     Chatter = Sm;
                     §§push(§§findproperty(xPos));
                     §§push(xPos - 8);
                     if(false)
                     {
                        5;
                        §§pop();
                        §§pop();
                     }
                     else
                     {
                        §§pop().xPos = §§pop();
                     }
                  }
                  if(Sm.Flags == 4)
                  {
                     §§push(§§findproperty(xPos));
                     §§push(xPos - 10);
                     if(false)
                     {
                        5;
                        §§pop();
                        §§pop();
                     }
                     else
                     {
                        §§pop().xPos = §§pop();
                     }
                     §§push(Sm);
                     §§push(Sm.y + 3);
                     if(false)
                     {
                        5;
                        §§pop();
                        §§pop();
                     }
                     else
                     {
                        §§pop().y = §§pop();
                     }
                  }
                  if(n == 0 && uid >= 0 && Words[n].charAt(1) == ">" && Boolean(todo.Users[uid].s))
                  {
                     §§push(Sm);
                     §§push(Sm.y + 4);
                     if(false)
                     {
                        5;
                        §§pop();
                        §§pop();
                     }
                     else
                     {
                        §§pop().y = §§pop();
                     }
                  }
               }
            }
            else if(!(c0 == "<" && s == "<c>"))
            {
               if(!SmilieBan)
               {
                  §§push(mcin);
                  §§push(mcin.t + (" " + Words[n]));
                  if(false)
                  {
                     5;
                     §§pop();
                     §§pop();
                  }
                  else
                  {
                     §§pop().t = §§pop();
                  }
                  ts = undefined;
                  if(Words[n].indexOf(".") >= 0)
                  {
                     ts = xatlib.WordIsLink(Words[n]);
                  }
                  if(ts)
                  {
                     if(s.indexOf("pt") >= 0 || s.indexOf("zz") >= 0 || s.indexOf("vv") >= 0 || s.indexOf("rr") >= 0 || s.indexOf("mg") >= 0 || s.indexOf("go") >= 0 || s.indexOf("liv") >= 0)
                     {
                        LocData = xatlib.urlencode(ts.substr(7));
                        HotLink = xatlib.PageUrl(4) + "&m=" + LocData;
                        LocFunc = function(param1:*):*
                        {
                           §§push(main);
                           if(false)
                           {
                              return;
                           }
                           return §§pop().mcLoad.OpenMedia(param1.currentTarget.LocData);
                        };
                        HotLink2 = ts;
                     }
                     else
                     {
                        s = ts;
                        HotLink = 1;
                     }
                  }
                  key = keywords[s];
                  if(key)
                  {
                     switch(key)
                     {
                        case 1:
                           HotLink = xatlib.PageUrl(2);
                           LocFunc = function(param1:*):*
                           {
                              §§push(main);
                              if(false)
                              {
                                 return;
                              }
                              return §§pop().mcLoad.OpenDoodle();
                           };
                           break;
                        case 2:
                           HotLink = xatlib.PageUrl(30008);
                           LocFunc = function(param1:*):*
                           {
                              §§push(main);
                              if(false)
                              {
                                 return;
                              }
                              return §§pop().mcLoad.OpenByN(30008);
                           };
                           break;
                        case 3:
                           HotLink = xatlib.PageUrl(5);
                           LocFunc = function(param1:*):*
                           {
                              §§push(main);
                              if(false)
                              {
                                 return;
                              }
                              return §§pop().mcLoad.OpenSmilies();
                           };
                           break;
                        case 4:
                           if(!ImInit)
                           {
                              HotLink = xatlib.PageUrl(6);
                           }
                           break;
                        case 5:
                           HotLink = xatlib.Register_Link(1);
                           LocFunc = 2;
                           break;
                        case 6:
                           HotLink = xatlib.Register_Link(0);
                           LocFunc = 2;
                           break;
                        case 7:
                           HotLink = xatlib.Register_Link(0) + "&b=1";
                           break;
                        case 8:
                           HotLink = xatlib.PageUrl(20044);
                           LocFunc = function(param1:*):*
                           {
                              §§push(main);
                              if(false)
                              {
                                 return;
                              }
                              return §§pop().mcLoad.OpenByN(20044);
                           };
                           break;
                        default:
                           if(key >= 10000)
                           {
                              HotLink = xatlib.PageUrl(key);
                              LocFunc = function(param1:*):*
                              {
                                 §§push(main);
                                 if(false)
                                 {
                                    return;
                                 }
                                 return §§pop().mcLoad.OpenByN(key);
                              };
                           }
                           else
                           {
                              HotLink = "http://x4t.co/" + key;
                           }
                     }
                  }
                  if(LocFunc == 2)
                  {
                     LocFunc = function(param1:*):*
                     {
                        §§push(main);
                        if(false)
                        {
                           return;
                        }
                        return §§pop().mcLoad.StartMedia("L" + this.Url);
                     };
                  }
                  if(!HotLink)
                  {
                     key = todo.gconfig["g100"];
                     if(key)
                     {
                        _local13 = key[s];
                        key = _local13;
                        if(_local13)
                        {
                           _local13 = "http://bit.ly/" + key;
                           HotLink3 = _local13;
                           HotLink = _local13;
                        }
                     }
                  }
                  if(HotLink && Boolean(id & 1))
                  {
                     if(HotLink == 1)
                     {
                        HotLink = s;
                     }
                     §§push(mcFmt);
                     §§push(true);
                     if(false)
                     {
                        5;
                        §§pop();
                        §§pop();
                     }
                     else
                     {
                        §§pop().underline = §§pop();
                     }
                     if(HotLink3)
                     {
                        §§push(mcFmt);
                        §§push(80);
                        if(false)
                        {
                           5;
                           §§pop();
                           §§pop();
                        }
                        else
                        {
                           §§pop().color = §§pop();
                        }
                     }
                     mc = new xSprite();
                     §§push(mcin);
                     §§push(mc);
                     if(false)
                     {
                        5;
                        §§pop();
                        §§pop();
                     }
                     else
                     {
                        §§pop().addChild(§§pop());
                     }
                     §§push(mc);
                     §§push(HotLink);
                     if(false)
                     {
                        5;
                        §§pop();
                        §§pop();
                     }
                     else
                     {
                        §§pop().Url = §§pop();
                     }
                     §§push(mc);
                     §§push(HotLink2);
                     if(false)
                     {
                        5;
                        §§pop();
                        §§pop();
                     }
                     else
                     {
                        §§pop().Url2 = §§pop();
                     }
                     §§push(mc);
                     §§push(LocFunc);
                     if(false)
                     {
                        5;
                        §§pop();
                        §§pop();
                     }
                     else
                     {
                        §§pop().LocFunc = §§pop();
                     }
                     §§push(mc);
                     §§push(LocData);
                     if(false)
                     {
                        5;
                        §§pop();
                        §§pop();
                     }
                     else
                     {
                        §§pop().LocData = §§pop();
                     }
                     §§push(mc);
                     §§push(true);
                     if(false)
                     {
                        5;
                        §§pop();
                        §§pop();
                     }
                     else
                     {
                        §§pop().useHandCursor = §§pop();
                     }
                     §§push(mc);
                     §§push(true);
                     if(false)
                     {
                        5;
                        §§pop();
                        §§pop();
                     }
                     else
                     {
                        §§pop().buttonMode = §§pop();
                     }
                     §§push(mc);
                     §§push(false);
                     if(false)
                     {
                        5;
                        §§pop();
                        §§pop();
                     }
                     else
                     {
                        §§pop().mouseChildren = §§pop();
                     }
                     §§push(mc);
                     §§push(MouseEvent.MOUSE_DOWN);
                     §§push(DoHotLink);
                     if(false)
                     {
                        5;
                        §§pop();
                        §§pop();
                        §§pop();
                     }
                     else
                     {
                        §§pop().addEventListener(§§pop(),§§pop());
                     }
                  }
                  if(LinkNextWord)
                  {
                     mc = new xSprite();
                     §§push(mcin);
                     §§push(mc);
                     if(false)
                     {
                        5;
                        §§pop();
                        §§pop();
                     }
                     else
                     {
                        §§pop().addChild(§§pop());
                     }
                     §§push(mc);
                     §§push(xatlib.xInt(UserNo));
                     if(false)
                     {
                        5;
                        §§pop();
                        §§pop();
                     }
                     else
                     {
                        §§pop().UserNo = §§pop();
                     }
                     if(UserNo == 0)
                     {
                        §§push(mc);
                        §§push(todo.w_userno);
                        if(false)
                        {
                           5;
                           §§pop();
                           §§pop();
                        }
                        else
                        {
                           §§pop().UserNo = §§pop();
                        }
                     }
                     §§push(mc);
                     §§push(MouseEvent.MOUSE_DOWN);
                     §§push(PressUserNameEvent);
                     if(false)
                     {
                        5;
                        §§pop();
                        §§pop();
                        §§pop();
                     }
                     else
                     {
                        §§pop().addEventListener(§§pop(),§§pop());
                     }
                     §§push(mc);
                     §§push(NameHint);
                     if(false)
                     {
                        5;
                        §§pop();
                        §§pop();
                     }
                     else
                     {
                        §§pop().nh = §§pop();
                     }
                     §§push(mc);
                     §§push(id);
                     if(false)
                     {
                        5;
                        §§pop();
                        §§pop();
                     }
                     else
                     {
                        §§pop().id = §§pop();
                     }
                     §§push(mc);
                     §§push(MouseEvent.ROLL_OVER);
                     §§push(HintUserName);
                     if(false)
                     {
                        5;
                        §§pop();
                        §§pop();
                        §§pop();
                     }
                     else
                     {
                        §§pop().addEventListener(§§pop(),§§pop());
                     }
                     §§push(mc);
                     §§push(MouseEvent.ROLL_OUT);
                     §§push(main.hint.HintOff);
                     if(false)
                     {
                        5;
                        §§pop();
                        §§pop();
                        §§pop();
                     }
                     else
                     {
                        §§pop().addEventListener(§§pop(),§§pop());
                     }
                     §§push(mc);
                     §§push(true);
                     if(false)
                     {
                        5;
                        §§pop();
                        §§pop();
                     }
                     else
                     {
                        §§pop().buttonMode = §§pop();
                     }
                     §§push(mc);
                     §§push(false);
                     if(false)
                     {
                        5;
                        §§pop();
                        §§pop();
                     }
                     else
                     {
                        §§pop().mouseChildren = §§pop();
                     }
                     if(id != 0)
                     {
                        LinkNextWord = false;
                     }
                  }
                  mcTxt = new TextField();
                  §§push(mcTxt);
                  §§push(xPos);
                  if(false)
                  {
                     5;
                     §§pop();
                     §§pop();
                  }
                  else
                  {
                     §§pop().x = §§pop();
                  }
                  §§push(mcTxt);
                  §§push(yPos + yOfst + 3);
                  if(false)
                  {
                     5;
                     §§pop();
                     §§pop();
                  }
                  else
                  {
                     §§pop().y = §§pop();
                  }
                  §§push(mcTxt);
                  §§push(Width);
                  if(false)
                  {
                     5;
                     §§pop();
                     §§pop();
                  }
                  else
                  {
                     §§pop().width = §§pop();
                  }
                  §§push(mcTxt);
                  §§push(LineH * 1.3);
                  if(false)
                  {
                     5;
                     §§pop();
                     §§pop();
                  }
                  else
                  {
                     §§pop().height = §§pop();
                  }
                  §§push(mcTxt);
                  §§push(true);
                  if(false)
                  {
                     5;
                     §§pop();
                     §§pop();
                  }
                  else
                  {
                     §§pop().selectable = §§pop();
                  }
                  §§push(mcTxt);
                  §§push(mcFmt);
                  if(false)
                  {
                     5;
                     §§pop();
                     §§pop();
                  }
                  else
                  {
                     §§pop().defaultTextFormat = §§pop();
                  }
                  §§push(mcTxt);
                  §§push(Words[n]);
                  if(false)
                  {
                     5;
                     §§pop();
                     §§pop();
                  }
                  else
                  {
                     §§pop().text = §§pop();
                  }
                  t = mc.addChild(mcTxt);
                  if(glowc != undefined)
                  {
                     if(todo.bThin)
                     {
                        §§push(mc);
                        §§push(glowc);
                        if(false)
                        {
                           5;
                           §§pop();
                           §§pop();
                        }
                        else
                        {
                           §§pop().Glow = §§pop();
                        }
                     }
                     else
                     {
                        §§push(mc);
                        §§push(mcin.glowa);
                        if(false)
                        {
                           5;
                           §§pop();
                           §§pop();
                        }
                        else
                        {
                           §§pop().filters = §§pop();
                        }
                     }
                  }
                  WordWidth = mcTxt.textWidth;
                  §§push(mcTxt);
                  §§push(WordWidth + 5);
                  if(false)
                  {
                     5;
                     §§pop();
                     §§pop();
                  }
                  else
                  {
                     §§pop().width = §§pop();
                  }
                  if(xPos > 0 && WordWidth > Width - xPos && userid == undefined && (id & 2) != 2)
                  {
                     f = 0;
                     if(Chatter != undefined)
                     {
                        §§push(Chatter);
                        §§push(Left);
                        if(false)
                        {
                           5;
                           §§pop();
                           §§pop();
                        }
                        else
                        {
                           §§pop().x = §§pop();
                        }
                        §§push(Chatter);
                        §§push(Chatter.y + LineH);
                        if(false)
                        {
                           5;
                           §§pop();
                           §§pop();
                        }
                        else
                        {
                           §§pop().y = §§pop();
                        }
                        f = 12;
                     }
                     §§push(mcTxt);
                     §§push(Left + f);
                     if(false)
                     {
                        5;
                        §§pop();
                        §§pop();
                     }
                     else
                     {
                        §§pop().x = §§pop();
                     }
                     §§push(mcTxt);
                     §§push(mcTxt.y + LineH);
                     if(false)
                     {
                        5;
                        §§pop();
                        §§pop();
                     }
                     else
                     {
                        §§pop().y = §§pop();
                     }
                     yPos += LineH;
                     §§push(§§findproperty(xPos));
                     §§push(Left + Space + WordWidth + f);
                     if(false)
                     {
                        5;
                        §§pop();
                        §§pop();
                     }
                     else
                     {
                        §§pop().xPos = §§pop();
                     }
                  }
                  else
                  {
                     Chatter = undefined;
                     §§push(§§findproperty(xPos));
                     §§push(xPos + (Space + WordWidth));
                     if(false)
                     {
                        5;
                        §§pop();
                        §§pop();
                     }
                     else
                     {
                        §§pop().xPos = §§pop();
                     }
                  }
                  if(SwearWord)
                  {
                     mc2 = new xSprite();
                     §§push(mcin);
                     §§push(mc2);
                     if(false)
                     {
                        5;
                        §§pop();
                        §§pop();
                     }
                     else
                     {
                        §§pop().addChild(§§pop());
                     }
                     mcTxt2 = new TextField();
                     §§push(mcTxt2);
                     §§push(mcTxt.x);
                     if(false)
                     {
                        5;
                        §§pop();
                        §§pop();
                     }
                     else
                     {
                        §§pop().x = §§pop();
                     }
                     §§push(mcTxt2);
                     §§push(mcTxt.y);
                     if(false)
                     {
                        5;
                        §§pop();
                        §§pop();
                     }
                     else
                     {
                        §§pop().y = §§pop();
                     }
                     §§push(mcTxt2);
                     §§push(Width);
                     if(false)
                     {
                        5;
                        §§pop();
                        §§pop();
                     }
                     else
                     {
                        §§pop().width = §§pop();
                     }
                     §§push(mcTxt2);
                     §§push(LineH * 1.3);
                     if(false)
                     {
                        5;
                        §§pop();
                        §§pop();
                     }
                     else
                     {
                        §§pop().height = §§pop();
                     }
                     t = mc2.addChild(mcTxt2);
                     schrs = "!#%£!@?*";
                     m2 = 0;
                     §§push(mcTxt2);
                     §§push(mcFmt);
                     if(false)
                     {
                        5;
                        §§pop();
                        §§pop();
                     }
                     else
                     {
                        §§pop().defaultTextFormat = §§pop();
                     }
                     §§push(mcTxt2);
                     §§push("");
                     if(false)
                     {
                        5;
                        §§pop();
                        §§pop();
                     }
                     else
                     {
                        §§pop().text = §§pop();
                     }
                     n2 = 0;
                     while(n2 < s.length)
                     {
                        m2 += 1;
                        §§push(mcTxt2);
                        §§push(mcTxt2.text + schrs.charAt(m2));
                        if(false)
                        {
                           5;
                           §§pop();
                           §§pop();
                        }
                        else
                        {
                           §§pop().text = §§pop();
                        }
                        if(m2 >= schrs.length)
                        {
                           m2 = 0;
                        }
                        n2 += 1;
                     }
                     §§push(mcTxt2);
                     §§push(WordWidth + 5);
                     if(false)
                     {
                        5;
                        §§pop();
                        §§pop();
                     }
                     else
                     {
                        §§pop().width = §§pop();
                     }
                     §§push(mcTxt2);
                     §§push(9474192);
                     if(false)
                     {
                        5;
                        §§pop();
                        §§pop();
                     }
                     else
                     {
                        §§pop().backgroundColor = §§pop();
                     }
                     if(SwearWord == "2")
                     {
                        §§push(mcTxt2);
                        §§push(9474303);
                        if(false)
                        {
                           5;
                           §§pop();
                           §§pop();
                        }
                        else
                        {
                           §§pop().backgroundColor = §§pop();
                        }
                     }
                     §§push(mcTxt2);
                     §§push(true);
                     if(false)
                     {
                        5;
                        §§pop();
                        §§pop();
                     }
                     else
                     {
                        §§pop().background = §§pop();
                     }
                     §§push(mc2);
                     §§push(MouseEvent.MOUSE_DOWN);
                     §§push(RemoveMe);
                     if(false)
                     {
                        5;
                        §§pop();
                        §§pop();
                        §§pop();
                     }
                     else
                     {
                        §§pop().addEventListener(§§pop(),§§pop());
                     }
                  }
               }
            }
         }
         return yPos + LineH;
      }
      
      public static function RemoveMe(param1:MouseEvent) : *
      {
         §§push(xmessage);
         if(false)
         {
            return;
         }
         §§push(param1.currentTarget.parent);
         §§push(param1.currentTarget);
         if(false)
         {
            5;
            §§pop();
            §§pop();
         }
         else
         {
            §§pop().removeChild(§§pop());
         }
      }
      
      public static function DoHotLink(param1:MouseEvent) : *
      {
         §§push(xmessage);
         if(false)
         {
            return;
         }
         var _loc2_:* = undefined;
         var _loc3_:* = chat.isKeyDown(Keyboard.SHIFT) || (todo.FlagBits & xconst.f_NoList) != 0 && !(global.xc & 0x0800);
         if(!_loc3_ && Boolean(param1.currentTarget.LocFunc))
         {
            §§push(param1.currentTarget);
            §§push(param1);
            if(false)
            {
               5;
               §§pop();
               §§pop();
            }
            else
            {
               §§pop().LocFunc(§§pop());
            }
         }
         if(_loc3_ || !param1.currentTarget.LocFunc || !(global.xc & 0x0800))
         {
            _loc2_ = param1.currentTarget.Url;
            if(_loc3_ && Boolean(param1.currentTarget.Url2))
            {
               _loc2_ = param1.currentTarget.Url2;
            }
            _loc2_ = xatlib.xatlinks(_loc2_);
            if(chat.isKeyDown(Keyboard.SHIFT))
            {
               _loc2_ += "";
            }
            §§push(xatlib);
            §§push(xconst.ST(8));
            §§push(_loc2_);
            §§push(xconst.ST(17));
            if(false)
            {
               5;
               §§pop();
               §§pop();
               §§pop();
               §§pop();
            }
            else
            {
               §§pop().UrlPopup(§§pop(),§§pop(),§§pop());
            }
         }
      }
      
      public static function PressUserNameEvent(param1:MouseEvent) : *
      {
         §§push(xmessage);
         if(false)
         {
            return;
         }
         §§push(§§findproperty(PressUserName));
         §§push(param1.currentTarget.UserNo);
         §§push(param1.ctrlKey);
         if(false)
         {
            5;
            §§pop();
            §§pop();
            §§pop();
         }
         else
         {
            §§pop().PressUserName(§§pop(),§§pop());
         }
      }
      
      public static function PressUserName(param1:*, param2:* = false) : *
      {
         §§push(xmessage);
         if(false)
         {
            return;
         }
         if(param1 == undefined)
         {
            return;
         }
         §§push(main.hint);
         if(false)
         {
            5;
            §§pop();
         }
         else
         {
            §§pop().HintOff();
         }
         if(param1 == 3)
         {
            return;
         }
         if(param1 == todo.w_userno)
         {
            §§push(main);
            §§push(1);
            if(false)
            {
               5;
               §§pop();
               §§pop();
            }
            else
            {
               §§pop().openDialog(§§pop());
            }
         }
         else if(param1 != 4294967295)
         {
            if(param2 && todo.Macros && Boolean(todo.Macros["rapid"]) && todo.HasPowerA(todo.w_Powers,91,todo.w_Mask))
            {
               §§push(§§findproperty(DoRapid));
               §§push(param1);
               if(false)
               {
                  5;
                  §§pop();
                  §§pop();
               }
               else
               {
                  §§pop().DoRapid(§§pop());
               }
            }
            else
            {
               §§push(main);
               §§push(2);
               §§push(param1);
               if(false)
               {
                  5;
                  §§pop();
                  §§pop();
                  §§pop();
               }
               else
               {
                  §§pop().openDialog(§§pop(),§§pop());
               }
            }
         }
      }
      
      public static function HintUserName(param1:MouseEvent) : *
      {
         §§push(xmessage);
         if(false)
         {
            return;
         }
         var _loc2_:* = undefined;
         var _loc3_:* = 0;
         var _loc4_:* = 8;
         if(param1.currentTarget.id == 2)
         {
            _loc3_ = 1;
            _loc4_ = 3;
         }
         if(todo.w_userno == param1.currentTarget.UserNo)
         {
            _loc2_ = xconst.ST(18);
         }
         else if(param1.currentTarget.UserNo == 3)
         {
            if(ImInit)
            {
               _loc2_ = xconst.ST(141);
            }
            else
            {
               _loc2_ = xconst.ST(142);
            }
         }
         else
         {
            _loc2_ = xconst.ST(16,xatlib.FixLI(xatlib.GetUsername(param1.currentTarget.UserNo,1,1,param1.currentTarget.nh)));
         }
         if(_loc2_)
         {
            §§push(main.hint);
            §§push(0);
            §§push(_loc4_);
            §§push(_loc2_);
            §§push(true);
            §§push(_loc3_);
            §§push(0);
            §§push(0);
            §§push(param1.currentTarget);
            if(false)
            {
               5;
               §§pop();
               §§pop();
               §§pop();
               §§pop();
               §§pop();
               §§pop();
               §§pop();
               §§pop();
               §§pop();
            }
            else
            {
               §§pop().Hint(§§pop(),§§pop(),§§pop(),§§pop(),§§pop(),§§pop(),§§pop(),§§pop());
            }
         }
      }
      
      public static function GotPower(param1:*, param2:*) : *
      {
         §§push(xmessage);
         if(false)
         {
            return;
         }
         return xatlib.SmOk(param1,param2,true);
      }
      
      public static function PowSm(param1:*, param2:*, param3:*, param4:*) : *
      {
         §§push(xmessage);
         if(false)
         {
            return;
         }
         var _loc5_:* = undefined;
         var _loc6_:* = undefined;
         var _loc7_:* = undefined;
         var _loc8_:* = undefined;
         var _loc9_:* = undefined;
         var _loc10_:* = undefined;
         var _loc11_:* = undefined;
         var _loc12_:* = undefined;
         var _loc13_:* = undefined;
         var _loc14_:* = undefined;
         var _loc15_:* = undefined;
         var _loc23_:Boolean = false;
         if(param2[1] == undefined)
         {
            return true;
         }
         if(!(param1.SF & 2))
         {
            return false;
         }
         if(param4 && Boolean(param4[0] & 1))
         {
            §§push(param1);
            §§push(param1.SF | smiley.f_AllPowers);
            if(false)
            {
               5;
               §§pop();
               §§pop();
            }
            else
            {
               §§pop().SF = §§pop();
            }
         }
         var _loc16_:* = param2.length;
         var _loc17_:* = true;
         var _loc18_:* = new Object();
         var _loc19_:* = "";
         var _loc20_:* = "";
         var _loc21_:* = 0;
         var _loc22_:* = true;
         _loc10_ = 1;
         for(; _loc10_ <= _loc16_; _loc10_++)
         {
            _loc11_ = undefined;
            if(param2[_loc10_] != undefined)
            {
               _loc11_ = param2[_loc10_].toLowerCase();
            }
            if(param2[_loc10_ - 1] === "piano")
            {
               §§push(param1);
               §§push(param1.SF | 0x80);
               if(false)
               {
                  5;
                  §§pop();
                  §§pop();
               }
               else
               {
                  §§pop().SF = §§pop();
               }
            }
            _loc5_ = xconst.effectsR[_loc11_];
            if(_loc5_ != undefined)
            {
               §§push(_loc18_);
               §§push(_loc5_);
               §§push(true);
               if(false)
               {
                  5;
                  §§pop();
                  §§pop();
                  §§pop();
               }
               else
               {
                  §§pop()[§§pop()] = §§pop();
               }
            }
            else
            {
               _loc5_ = xconst.effects[_loc11_];
               if(_loc5_ != undefined)
               {
                  §§push(_loc18_);
                  §§push(_loc11_);
                  §§push(true);
                  if(false)
                  {
                     5;
                     §§pop();
                     §§pop();
                     §§pop();
                  }
                  else
                  {
                     §§pop()[§§pop()] = §§pop();
                  }
                  if(_loc17_ || _loc11_ != "y")
                  {
                     continue;
                  }
               }
               _loc5_ = xconst.backsR[_loc11_];
               if(_loc5_ != undefined)
               {
                  _loc7_ = _loc5_;
               }
               else
               {
                  if(_loc11_ != undefined && _loc11_.length == 1)
                  {
                     _loc5_ = xconst.backs[_loc11_];
                  }
                  if(_loc5_ != undefined)
                  {
                     _loc7_ = _loc11_;
                  }
                  else if(xconst.smih[_loc11_] && _loc11_.length != 1 || _loc11_ == undefined || _loc11_ == "6")
                  {
                     if(_loc23_)
                     {
                        break;
                     }
                     if(_loc11_ == "hole")
                     {
                        _loc23_ = true;
                     }
                     for(_loc13_ in _loc18_)
                     {
                        _loc5_ = xconst.effects[_loc13_];
                        if(!GotPower(_loc5_,param4))
                        {
                           §§push(_loc18_);
                           §§push(_loc13_);
                           §§push(false);
                           if(false)
                           {
                              5;
                              §§pop();
                              §§pop();
                              §§pop();
                           }
                           else
                           {
                              §§pop()[§§pop()] = §§pop();
                           }
                           _loc22_ = false;
                        }
                     }
                     if(_loc17_)
                     {
                        _loc9_ = _loc18_;
                        if(GotPower(xconst.backs[_loc7_],param4))
                        {
                           §§push(param1);
                           §§push(xconst.backs[_loc7_]);
                           if(false)
                           {
                              5;
                              §§pop();
                              §§pop();
                           }
                           else
                           {
                              §§pop().ST = §§pop();
                           }
                        }
                        else
                        {
                           _loc22_ = false;
                        }
                        §§push(param1);
                        §§push(_loc20_);
                        if(false)
                        {
                           5;
                           §§pop();
                           §§pop();
                        }
                        else
                        {
                           §§pop().SC = §§pop();
                        }
                        if(_loc9_["f"])
                        {
                           §§push(param1);
                           §§push(4);
                           if(false)
                           {
                              5;
                              §§pop();
                              §§pop();
                           }
                           else
                           {
                              §§pop().SP = §§pop();
                           }
                        }
                        if(_loc9_["y"])
                        {
                           §§push(param1);
                           §§push("y");
                           if(false)
                           {
                              5;
                              §§pop();
                              §§pop();
                           }
                           else
                           {
                              §§pop().SC = §§pop();
                           }
                        }
                     }
                     else
                     {
                        _loc19_ += ",";
                        _loc5_ = 1;
                        if(_loc18_["f"])
                        {
                           _loc5_ |= 4;
                        }
                        _loc19_ += _loc5_;
                     }
                     if(_loc11_ == "6" && param1.SC == undefined)
                     {
                        §§push(param1);
                        §§push(15728640);
                        if(false)
                        {
                           5;
                           §§pop();
                           §§pop();
                        }
                        else
                        {
                           §§pop().SC = §§pop();
                        }
                     }
                     _loc20_ = undefined;
                     _loc18_ = new Object();
                     _loc8_ = false;
                     if(++_loc21_ >= 6)
                     {
                        break;
                     }
                     if(!todo.HasPowerA(param4,0) || _loc11_ != "allpowers")
                     {
                        if(!xatlib.SmOk(_loc11_,param4,true))
                        {
                           if(_loc11_)
                           {
                              §§push(param2);
                              §§push(_loc10_);
                              §§push("none");
                              if(false)
                              {
                                 5;
                                 §§pop();
                                 §§pop();
                                 §§pop();
                              }
                              else
                              {
                                 §§pop()[§§pop()] = §§pop();
                              }
                              _loc22_ = false;
                           }
                           break;
                        }
                     }
                     if(!_loc17_)
                     {
                        _loc19_ += ",";
                     }
                     _loc19_ += _loc11_ + ",";
                     _loc17_ = false;
                  }
                  else
                  {
                     _loc12_ = false;
                     if(_loc11_.length == 6)
                     {
                        _loc5_ = parseInt(_loc11_,16);
                        _loc5_ = _loc5_.toString(16);
                        _loc5_ = "000000" + _loc5_;
                        _loc5_ = _loc5_.substr(-6,6);
                     }
                     else
                     {
                        _loc5_ = "";
                     }
                     if(_loc11_ == "y")
                     {
                        if(!todo.HasPowerA(param4,22))
                        {
                           _loc5_ = _loc11_ = "";
                        }
                        _loc12_ = true;
                     }
                     if(_loc5_ != _loc11_)
                     {
                        _loc14_ = _loc11_.length;
                        _loc15_ = 0;
                        while(_loc15_ < _loc14_)
                        {
                           _loc5_ = _loc11_.charAt(_loc15_);
                           if(xconst.effects[_loc5_] == undefined && !xconst.colorc[_loc5_])
                           {
                              _loc12_ = true;
                              break;
                           }
                           _loc15_++;
                        }
                        if(!_loc12_)
                        {
                           _loc15_ = 0;
                           while(_loc15_ < _loc14_)
                           {
                              _loc5_ = _loc11_.charAt(_loc15_);
                              §§push(_loc18_);
                              §§push(_loc5_);
                              §§push(true);
                              if(false)
                              {
                                 5;
                                 §§pop();
                                 §§pop();
                                 §§pop();
                              }
                              else
                              {
                                 §§pop()[§§pop()] = §§pop();
                              }
                              _loc15_++;
                           }
                        }
                     }
                     if(!_loc12_)
                     {
                        _loc5_ = xatlib.DecodeColor(_loc11_,todo.HasPowerA(param4,13),todo.HasPowerA(param4,14),todo.HasPowerA(param4,15),todo.HasPowerA(param4,16));
                        if(_loc5_ != undefined)
                        {
                           if(!_loc17_)
                           {
                              if(_loc8_)
                              {
                                 _loc19_ += "#";
                              }
                              _loc8_ = true;
                              _loc19_ += _loc5_;
                           }
                           else
                           {
                              _loc20_ += _loc5_ + "#";
                           }
                        }
                     }
                     if(_loc12_ && !_loc17_)
                     {
                        if(_loc8_)
                        {
                           _loc19_ += "#";
                        }
                        _loc8_ = true;
                        _loc19_ += _loc11_;
                     }
                  }
               }
            }
         }
         if(_loc19_ != "")
         {
            §§push(param1);
            §§push(_loc19_);
            if(false)
            {
               5;
               §§pop();
               §§pop();
            }
            else
            {
               §§pop().SE = §§pop();
            }
         }
         if(Boolean(_loc9_["i"]) && Boolean(param4[0] & 0x40))
         {
            §§push(param1);
            §§push(-1);
            if(false)
            {
               5;
               §§pop();
               §§pop();
            }
            else
            {
               §§pop().scaleY = §§pop();
            }
            §§push(param1);
            §§push(param1.y + param3);
            if(false)
            {
               5;
               §§pop();
               §§pop();
            }
            else
            {
               §§pop().y = §§pop();
            }
         }
         if(Boolean(_loc9_["m"]) && Boolean(param4[0] & 0x80))
         {
            §§push(param1);
            §§push(-1);
            if(false)
            {
               5;
               §§pop();
               §§pop();
            }
            else
            {
               §§pop().scaleX = §§pop();
            }
            §§push(param1);
            §§push(param3);
            if(false)
            {
               5;
               §§pop();
               §§pop();
            }
            else
            {
               §§pop().xx = §§pop();
            }
         }
         §§push(param1);
         §§push("(" + param2.join("#") + ")");
         if(false)
         {
            5;
            §§pop();
            §§pop();
         }
         else
         {
            §§pop().SA = §§pop();
         }
         return _loc22_;
      }
      
      public static function Smilie(param1:*, param2:String, param3:Number, param4:Number, param5:*, param6:String) : *
      {
         var _arg1:*;
         var _arg2:String;
         var _arg3:Number;
         var _arg4:Number;
         var _arg5:*;
         var _arg6:String;
         var smc:*;
         var HTxt:*;
         var t:*;
         var key:*;
         var smc2:*;
         var m:*;
         var classRef:*;
         var Args:*;
         var G:*;
         var e:*;
         var t2:*;
         var Col:*;
         var s2:*;
         var mc:*;
         var s:*;
         var u:*;
         var userid:*;
         var Pos:*;
         var Code:*;
         var uid:*;
         var c0:*;
         var Clicker:*;
         var _local8:*;
         var xatUserID:*;
         var special:*;
         §§push(xmessage);
         if(false)
         {
            return;
         }
         uid = undefined;
         _local8 = undefined;
         xatUserID = undefined;
         special = undefined;
         _arg1 = param1;
         _arg2 = param2;
         _arg3 = param3;
         _arg4 = param4;
         _arg5 = param5;
         _arg6 = param6;
         smc = undefined;
         HTxt = undefined;
         t = undefined;
         key = undefined;
         smc2 = undefined;
         m = undefined;
         classRef = null;
         Args = undefined;
         G = undefined;
         e = undefined;
         t2 = undefined;
         Col = undefined;
         s2 = undefined;
         mc = _arg1;
         s = _arg2;
         u = _arg3;
         userid = _arg4;
         Pos = _arg5;
         Code = _arg6;
         if(!userid)
         {
            userid = xatlib.FindUser(u);
         }
         if(userid == -1)
         {
            userid = 0;
         }
         uid = userid;
         c0 = s.charAt(0).toLowerCase();
         if(!FirstC)
         {
            t = ":,;,<,#,8,(";
            t = t.split(",");
            §§push(§§findproperty(FirstC));
            §§push({});
            if(false)
            {
               5;
               §§pop();
               §§pop();
            }
            else
            {
               §§pop().FirstC = §§pop();
            }
            for(key in t)
            {
               §§push(FirstC);
               §§push(t[key]);
               §§push(true);
               if(false)
               {
                  5;
                  §§pop();
                  §§pop();
                  §§pop();
               }
               else
               {
                  §§pop()[§§pop()] = §§pop();
               }
            }
         }
         if(FirstC[c0])
         {
            if(c0 == "#")
            {
               _local8 = new library("Speaker");
               smc = _local8;
               smc2 = _local8;
               §§push(smc2);
               §§push(smc2.scaleY = 0.8260869565217391);
               if(false)
               {
                  5;
                  §§pop();
                  §§pop();
               }
               else
               {
                  §§pop().scaleX = §§pop();
               }
               if(!todo.bThin)
               {
                  §§push(smc2.xitem);
                  §§push(1);
                  if(false)
                  {
                     5;
                     §§pop();
                     §§pop();
                  }
                  else
                  {
                     §§pop().gotoAndStop(§§pop());
                  }
               }
               §§push(smc2.xitem.SoundIsOff);
               §§push(false);
               if(false)
               {
                  5;
                  §§pop();
                  §§pop();
               }
               else
               {
                  §§pop().visible = §§pop();
               }
               HTxt = s;
               if(!todo.bMobile)
               {
                  §§push(smc);
                  §§push(MouseEvent.MOUSE_DOWN);
                  §§push(DoSound);
                  if(false)
                  {
                     5;
                     §§pop();
                     §§pop();
                     §§pop();
                  }
                  else
                  {
                     §§pop().addEventListener(§§pop(),§§pop());
                  }
               }
               §§push(smc);
               §§push(s);
               if(false)
               {
                  5;
                  §§pop();
                  §§pop();
               }
               else
               {
                  §§pop().Snd = §§pop();
               }
            }
            if(c0 == ":" || c0 == ";" || c0 == "8")
            {
               m = 0;
               while(m < xconst.smArray.length)
               {
                  if(xconst.smArray[m] == s)
                  {
                     while(xconst.smArray[m] >= 0)
                     {
                        m += 1;
                        if(m >= xconst.smArray.length)
                        {
                           break;
                        }
                     }
                     HTxt = s.toUpperCase();
                     if(todo.bThin || xconst.smArray[m] < -1)
                     {
                        _local8 = "(" + xconst.smArray[m - 1] + ")";
                        s = _local8;
                        Code = _local8;
                        break;
                     }
                     classRef = getDefinitionByName(xconst.smArray[m - 1]) as Class;
                     smc = new classRef();
                     §§push(smc);
                     §§push(u);
                     if(false)
                     {
                        5;
                        §§pop();
                        §§pop();
                     }
                     else
                     {
                        §§pop().UserNo = §§pop();
                     }
                     break;
                  }
                  while(xconst.smArray[m] >= 0)
                  {
                     m += 1;
                     if(m >= xconst.smArray.length)
                     {
                        break;
                     }
                  }
                  m += 1;
               }
            }
            if(smc == undefined && c0 == "(" && s.charAt(s.length - 1) == ")")
            {
               Args = new Array();
               t = s.substr(1,s.length - 2);
               G = t.charAt(0) == ">";
               if(G)
               {
                  t = xatlib.xInt(t.substr(1));
               }
               else
               {
                  if(xatlib.xInt(t) >= 10000)
                  {
                     t = "";
                  }
                  Args = t.split("#");
                  t = Args[0];
                  if(SmB == undefined && !xatlib.SmOk(t,todo.Users[uid].Powers))
                  {
                     t = -1;
                  }
               }
               if(Args[0] == "hat" && Args[1] != undefined || Args[0] == "glow")
               {
                  _local8 = "none";
                  t = _local8;
                  §§push(Args);
                  §§push(0);
                  §§push(_local8);
                  if(false)
                  {
                     5;
                     §§pop();
                     §§pop();
                     §§pop();
                  }
                  else
                  {
                     §§pop()[§§pop()] = §§pop();
                  }
               }
               if(t != -1 || G)
               {
                  if(todo.bMobile)
                  {
                     smc = {};
                  }
                  else
                  {
                     smc = new MovieClip();
                  }
                  e = "";
                  if(todo.Users[uid].registered != undefined)
                  {
                     §§push(smc);
                     §§push(1);
                     if(false)
                     {
                        5;
                        §§pop();
                        §§pop();
                     }
                     else
                     {
                        §§pop().SF = §§pop();
                     }
                  }
                  if(todo.Users[uid].VIP)
                  {
                     e = "&r=2";
                     §§push(smc);
                     §§push(2);
                     if(false)
                     {
                        5;
                        §§pop();
                        §§pop();
                     }
                     else
                     {
                        §§pop().SF = §§pop();
                     }
                  }
                  §§push(smc);
                  §§push(u);
                  if(false)
                  {
                     5;
                     §§pop();
                     §§pop();
                  }
                  else
                  {
                     §§pop().UserNo = §§pop();
                  }
                  if(xconst.topsh[t] == -3)
                  {
                     §§push(smc);
                     §§push(u);
                     if(false)
                     {
                        5;
                        §§pop();
                        §§pop();
                     }
                     else
                     {
                        §§pop().Gifts = §§pop();
                     }
                  }
                  if(t >= 10128 && t < 20000)
                  {
                     classRef = getDefinitionByName(t) as Class;
                     t2 = new classRef();
                     §§push(smc);
                     §§push(t2);
                     if(false)
                     {
                        5;
                        §§pop();
                        §§pop();
                     }
                     else
                     {
                        §§pop().addChild(§§pop());
                     }
                  }
                  else
                  {
                     if(t > 50000)
                     {
                        if(todo.bMobile)
                        {
                           return false;
                        }
                        Args = new Array();
                        if(t >= 60000)
                        {
                           t2 = t - 60000 & -2;
                           if(!xconst.Game[t2])
                           {
                              return;
                           }
                           §§push(Args);
                           §§push(xconst.Game[t2]);
                           if(false)
                           {
                              5;
                              §§pop();
                              §§pop();
                           }
                           else
                           {
                              §§pop().push(§§pop());
                           }
                        }
                        else
                        {
                           §§push(Args);
                           §§push(xconst.Puzzle[t - 50000] + "ban");
                           if(false)
                           {
                              5;
                              §§pop();
                              §§pop();
                           }
                           else
                           {
                              §§pop().push(§§pop());
                           }
                        }
                        §§push(Args);
                        §§push("wb1");
                        if(false)
                        {
                           5;
                           §§pop();
                           §§pop();
                        }
                        else
                        {
                           §§pop().push(§§pop());
                        }
                        if(todo.Users[userid].w)
                        {
                           §§push(Args);
                           §§push("964B00");
                           if(false)
                           {
                              5;
                              §§pop();
                              §§pop();
                           }
                           else
                           {
                              §§pop().push(§§pop());
                           }
                        }
                        §§push(smc);
                        §§push(2);
                        if(false)
                        {
                           5;
                           §§pop();
                           §§pop();
                        }
                        else
                        {
                           §§pop().SF = §§pop();
                        }
                        §§push(§§findproperty(PowSm));
                        §§push(smc);
                        §§push(Args);
                        §§push(19);
                        §§push(todo.ALL_POWERS);
                        if(false)
                        {
                           5;
                           §§pop();
                           §§pop();
                           §§pop();
                           §§pop();
                           §§pop();
                        }
                        else
                        {
                           §§pop().PowSm(§§pop(),§§pop(),§§pop(),§§pop());
                        }
                        §§push(smc);
                        §§push(new smiley(smc,Args[0]));
                        if(false)
                        {
                           5;
                           §§pop();
                           §§pop();
                        }
                        else
                        {
                           §§pop().ns = §§pop();
                        }
                     }
                     else
                     {
                        if(!PowSm(smc,Args,19,todo.Users[uid].Powers))
                        {
                           §§push(smc);
                           §§push(u);
                           if(false)
                           {
                              5;
                              §§pop();
                              §§pop();
                           }
                           else
                           {
                              §§pop().u = §§pop();
                           }
                           if(todo.bMobile)
                           {
                              return false;
                           }
                        }
                        §§push(smc);
                        §§push(Code);
                        if(false)
                        {
                           5;
                           §§pop();
                           §§pop();
                        }
                        else
                        {
                           §§pop().SA = §§pop();
                        }
                        if(!SmB)
                        {
                           §§push(smc);
                           §§push(smc.SP | smiley.b_glow);
                           if(false)
                           {
                              5;
                              §§pop();
                              §§pop();
                           }
                           else
                           {
                              §§pop().SP = §§pop();
                           }
                        }
                        if(!todo.bMobile)
                        {
                           §§push(smc);
                           §§push(new smiley(smc,t));
                           if(false)
                           {
                              5;
                              §§pop();
                              §§pop();
                           }
                           else
                           {
                              §§pop().ns = §§pop();
                           }
                        }
                        if(todo.bMobile)
                        {
                           smc = Code;
                        }
                     }
                     if(!(smc is String))
                     {
                        §§push(smc);
                        §§push(smc.x + xatlib.xInt(smc.xx));
                        if(false)
                        {
                           5;
                           §§pop();
                           §§pop();
                        }
                        else
                        {
                           §§pop().x = §§pop();
                        }
                     }
                  }
                  if(!HTxt)
                  {
                     HTxt = s.toUpperCase();
                  }
                  if(G)
                  {
                     HTxt = 0;
                     if(t == 10200)
                     {
                        HTxt = " ";
                     }
                     else
                     {
                        HTxt = xconst.ST(143);
                        if(t > 50000 && t < 60000 && !todo.HasPowerA(todo.w_GroupPowers,t % 50000))
                        {
                           t = undefined;
                        }
                        §§push(smc);
                        §§push(t);
                        if(false)
                        {
                           5;
                           §§pop();
                           §§pop();
                        }
                        else
                        {
                           §§pop().xNum = §§pop();
                        }
                     }
                  }
                  if(!todo.bMobile && Boolean(smc.SF & 0x80))
                  {
                     §§push(smc);
                     §§push(MouseEvent.MOUSE_DOWN);
                     §§push(DoSound);
                     if(false)
                     {
                        5;
                        §§pop();
                        §§pop();
                        §§pop();
                     }
                     else
                     {
                        §§pop().addEventListener(§§pop(),§§pop());
                     }
                  }
               }
            }
            if(c0 == "<")
            {
               if(s == "<del>")
               {
                  smc = new library("xdelete");
                  §§push(smc);
                  §§push(6);
                  if(false)
                  {
                     5;
                     §§pop();
                     §§pop();
                  }
                  else
                  {
                     §§pop().y = §§pop();
                  }
                  §§push(smc);
                  §§push(DeleteNumber);
                  if(false)
                  {
                     5;
                     §§pop();
                     §§pop();
                  }
                  else
                  {
                     §§pop().DeleteNumber = §§pop();
                  }
                  if(!todo.bMobile)
                  {
                     §§push(smc);
                     §§push(MouseEvent.MOUSE_DOWN);
                     §§push(DeleteMess);
                     if(false)
                     {
                        5;
                        §§pop();
                        §§pop();
                        §§pop();
                     }
                     else
                     {
                        §§pop().addEventListener(§§pop(),§§pop());
                     }
                  }
                  §§push(smc);
                  §§push(1);
                  if(false)
                  {
                     5;
                     §§pop();
                     §§pop();
                  }
                  else
                  {
                     §§pop().Flags = §§pop();
                  }
                  HTxt = xconst.ST(1);
               }
               if(s == "<o>")
               {
                  smc = new chatter2();
                  §§push(smc);
                  if(false)
                  {
                     5;
                     §§pop();
                  }
                  else
                  {
                     §§pop().Go();
                  }
                  if(!todo.bMobile)
                  {
                     §§push(smc);
                     §§push(MouseEvent.MOUSE_DOWN);
                     if(false)
                     {
                        5;
                        §§pop();
                        §§pop();
                        §§pop();
                     }
                     else
                     {
                        §§pop().addEventListener(§§pop(),§§pop());
                     }
                  }
                  §§push(smc);
                  §§push(2);
                  if(false)
                  {
                     5;
                     §§pop();
                     §§pop();
                  }
                  else
                  {
                     §§pop().Flags = §§pop();
                  }
               }
               if(s == "<priv>")
               {
                  smc = new lock();
                  §§push(smc);
                  §§push({
                     "Hint":xconst.ST(20),
                     "mc":smc
                  });
                  if(false)
                  {
                     5;
                     §§pop();
                     §§pop();
                  }
                  else
                  {
                     §§pop().hint = §§pop();
                  }
                  if(!todo.bMobile)
                  {
                     §§push(smc);
                     §§push(MouseEvent.ROLL_OVER);
                     §§push(main.hint.EasyHint);
                     if(false)
                     {
                        5;
                        §§pop();
                        §§pop();
                        §§pop();
                     }
                     else
                     {
                        §§pop().addEventListener(§§pop(),§§pop());
                     }
                  }
                  §§push(smc);
                  §§push(4);
                  if(false)
                  {
                     5;
                     §§pop();
                     §§pop();
                  }
                  else
                  {
                     §§pop().Flags = §§pop();
                  }
               }
               if(s == "<i>")
               {
                  smc = new library("HelpIcon");
                  §§push(smc.xitem.ques);
                  §§push(false);
                  if(false)
                  {
                     5;
                     §§pop();
                     §§pop();
                  }
                  else
                  {
                     §§pop().visible = §§pop();
                  }
               }
               if(s == "<inf8>")
               {
                  smc = new library("HelpIcon");
                  §§push(smc.xitem.ques);
                  §§push(false);
                  if(false)
                  {
                     5;
                     §§pop();
                     §§pop();
                  }
                  else
                  {
                     §§pop().visible = §§pop();
                  }
                  §§push(xatlib);
                  §§push(smc.xitem.infob);
                  §§push(39168);
                  if(false)
                  {
                     5;
                     §§pop();
                     §§pop();
                     §§pop();
                  }
                  else
                  {
                     §§pop().McSetRGB(§§pop(),§§pop());
                  }
               }
               if(s == "<ho>")
               {
                  if(todo.Users[uid].h.length > 0)
                  {
                     smc = new library("ho");
                     §§push(smc);
                     §§push(smc.scaleY = 0.4);
                     if(false)
                     {
                        5;
                        §§pop();
                        §§pop();
                     }
                     else
                     {
                        §§pop().scaleX = §§pop();
                     }
                     §§push(smc);
                     §§push(5);
                     if(false)
                     {
                        5;
                        §§pop();
                        §§pop();
                     }
                     else
                     {
                        §§pop().y = §§pop();
                     }
                     HTxt = smc.HomePage = todo.Users[uid].h;
                     if(!todo.bMobile)
                     {
                        §§push(smc);
                        §§push(MouseEvent.MOUSE_DOWN);
                        §§push(OnHomePage);
                        if(false)
                        {
                           5;
                           §§pop();
                           §§pop();
                           §§pop();
                        }
                        else
                        {
                           §§pop().addEventListener(§§pop(),§§pop());
                        }
                     }
                     §§push(smc);
                     §§push(1);
                     if(false)
                     {
                        5;
                        §§pop();
                        §§pop();
                     }
                     else
                     {
                        §§pop().Flags = §§pop();
                     }
                  }
               }
               if(s == "<c>")
               {
                  Col = -1;
                  if(todo.Users[userid].member)
                  {
                     Col = 6645247;
                     HTxt = xconst.ST(22);
                     if(todo.HasPower(userid,30))
                     {
                        Col = 16716947;
                     }
                     if(todo.HasPower(userid,64))
                     {
                        Col = 128;
                     }
                  }
                  if(todo.Users[userid].moderator)
                  {
                     Col = 16777215;
                     HTxt = xconst.ST(23);
                  }
                  if(todo.Users[userid].owner)
                  {
                     Col = 16750848;
                     HTxt = xconst.ST(24);
                  }
                  if(todo.Users[userid].mainowner)
                  {
                     Col = 16750848;
                     HTxt = xconst.ST(134);
                  }
                  if(todo.Users[userid].Stealth)
                  {
                     Col = -1;
                  }
                  else if(todo.Users[userid].aFlags & 0x200000)
                  {
                     Col = 1304549;
                     HTxt = xconst.ST(251);
                  }
                  else
                  {
                     xatUserID = todo.Users[userid].u;
                     for(uid in todo.ixatStaff)
                     {
                        if(xatlib.xInt(uid) == xatUserID)
                        {
                           HTxt = "iXat Staff";
                           break;
                        }
                     }
                     if(todo.Users[userid].custom_pawn != undefined)
                     {
                        Col = xatlib.DecodeColor(todo.Users[userid].custom_pawn);
                     }
                     else
                     {
                        special = false;
                        if(todo.HasPower(userid,213))
                        {
                           Col = 14423100;
                           special = "p1ruby";
                        }
                        else if(todo.HasPower(userid,295))
                        {
                           Col = 16777215;
                           special = "p1awesome";
                        }
                        else if(todo.HasPower(userid,294))
                        {
                           Col = 255;
                           special = "p1ruby";
                        }
                        else if(todo.HasPower(userid,153))
                        {
                           Col = 16041823;
                           special = "p1gold";
                        }
                        else if(todo.HasPower(userid,35))
                        {
                           Col = 8388736;
                        }
                     }
                  }
                  if(Col >= 0)
                  {
                     smc = new chatter2();
                     §§push(smc);
                     §§push(Col);
                     if(false)
                     {
                        5;
                        §§pop();
                        §§pop();
                     }
                     else
                     {
                        §§pop().ColP1 = §§pop();
                     }
                     §§push(smc);
                     §§push(16);
                     if(false)
                     {
                        5;
                        §§pop();
                        §§pop();
                     }
                     else
                     {
                        §§pop().Size = §§pop();
                     }
                     if(special != false)
                     {
                        §§push(smc);
                        §§push(special);
                        if(false)
                        {
                           5;
                           §§pop();
                           §§pop();
                        }
                        else
                        {
                           §§pop().Pawn = §§pop();
                        }
                     }
                     if(todo.Users[userid].friend == 3)
                     {
                        §§push(smc);
                        §§push("p1foe");
                        if(false)
                        {
                           5;
                           §§pop();
                           §§pop();
                        }
                        else
                        {
                           §§pop().Pawn = §§pop();
                        }
                     }
                     §§push(smc);
                     if(false)
                     {
                        5;
                        §§pop();
                     }
                     else
                     {
                        §§pop().Go();
                     }
                     §§push(smc);
                     §§push(4);
                     if(false)
                     {
                        5;
                        §§pop();
                        §§pop();
                     }
                     else
                     {
                        §§pop().y = §§pop();
                     }
                     §§push(smc);
                     §§push(2);
                     if(false)
                     {
                        5;
                        §§pop();
                        §§pop();
                     }
                     else
                     {
                        §§pop().Flags = §§pop();
                     }
                  }
               }
            }
         }
         if(mc && smc)
         {
            §§push(mc);
            §§push(smc);
            if(false)
            {
               5;
               §§pop();
               §§pop();
            }
            else
            {
               §§pop().addChild(§§pop());
            }
         }
         Clicker = smc;
         if(!todo.bMobile && HTxt && smc)
         {
            §§push(smc);
            §§push(HTxt);
            if(false)
            {
               5;
               §§pop();
               §§pop();
            }
            else
            {
               §§pop().Hint = §§pop();
            }
            if(Boolean(smc.ns) && Boolean(smc.ns.Clicker))
            {
               §§push(smc);
               §§push(false);
               if(false)
               {
                  5;
                  §§pop();
                  §§pop();
               }
               else
               {
                  §§pop().mouseEnabled = §§pop();
               }
               Clicker = smc.ns.Clicker;
               §§push(Clicker);
               §§push(smc);
               if(false)
               {
                  5;
                  §§pop();
                  §§pop();
               }
               else
               {
                  §§pop().Par = §§pop();
               }
            }
            §§push(Clicker);
            §§push(MouseEvent.ROLL_OVER);
            §§push(smc_onRollOver);
            if(false)
            {
               5;
               §§pop();
               §§pop();
               §§pop();
            }
            else
            {
               §§pop().addEventListener(§§pop(),§§pop());
            }
            §§push(Clicker);
            §§push(MouseEvent.ROLL_OUT);
            §§push(smc_onRollOut);
            if(false)
            {
               5;
               §§pop();
               §§pop();
               §§pop();
            }
            else
            {
               §§pop().addEventListener(§§pop(),§§pop());
            }
            if(!todo.bThin && HTxt.substr(0,14) == "(RADIO#HTTP://")
            {
               s2 = HTxt.split("#");
               s2 = s2[1].split(")");
               §§push(smc);
               §§push(s2[0]);
               if(false)
               {
                  5;
                  §§pop();
                  §§pop();
               }
               else
               {
                  §§pop().Radio = §§pop();
               }
               if(!Ronce && Pos == 2 && u == todo.w_userno)
               {
                  §§push(§§findproperty(Ronce));
                  §§push(1);
                  if(false)
                  {
                     5;
                     §§pop();
                     §§pop();
                  }
                  else
                  {
                     §§pop().Ronce = §§pop();
                  }
                  if(todo.useRadio == undefined)
                  {
                     §§push(todo);
                     §§push(smc.Radio);
                     if(false)
                     {
                        5;
                        §§pop();
                        §§pop();
                     }
                     else
                     {
                        §§pop().useRadio = §§pop();
                     }
                     §§push(chat.mainDlg);
                     §§push("Radio");
                     §§push(2);
                     if(false)
                     {
                        5;
                        §§pop();
                        §§pop();
                        §§pop();
                     }
                     else
                     {
                        §§pop().CreateSoundIcon(§§pop(),§§pop());
                     }
                  }
                  §§push(todo);
                  §§push(smc.Radio);
                  if(false)
                  {
                     5;
                     §§pop();
                     §§pop();
                  }
                  else
                  {
                     §§pop().useRadio = §§pop();
                  }
               }
            }
            t = HTxt.substr(1);
            t = t.split(")");
            t = t[0].split("#");
            t = t[0].toLowerCase();
            t = xconst.pssh[t];
            if(xconst.IsGroup[t])
            {
               §§push(smc);
               §§push(t);
               if(false)
               {
                  5;
                  §§pop();
                  §§pop();
               }
               else
               {
                  §§pop().Power = §§pop();
               }
            }
            §§push(Clicker);
            §§push(MouseEvent.MOUSE_DOWN);
            §§push(smc_onPress);
            if(false)
            {
               5;
               §§pop();
               §§pop();
               §§pop();
            }
            else
            {
               §§pop().addEventListener(§§pop(),§§pop());
            }
         }
         if(Boolean(Pos & 1) && smc != undefined)
         {
            §§push(smc);
            §§push(undefined);
            if(false)
            {
               5;
               §§pop();
               §§pop();
            }
            else
            {
               §§pop().UserNo = §§pop();
            }
         }
         if(!todo.bMobile && Clicker)
         {
            §§push(Clicker);
            §§push(true);
            if(false)
            {
               5;
               §§pop();
               §§pop();
            }
            else
            {
               §§pop().buttonMode = §§pop();
            }
         }
         return smc;
      }
      
      internal static function smc_onRollOver(param1:MouseEvent) : *
      {
         §§push(xmessage);
         if(false)
         {
            return;
         }
         var _loc2_:* = param1.currentTarget;
         if(_loc2_.Par)
         {
            _loc2_ = _loc2_.Par;
         }
         §§push(main.hint);
         §§push(0);
         §§push(0);
         §§push(_loc2_.Hint);
         §§push(true);
         §§push(0);
         §§push(undefined);
         §§push(0);
         §§push(_loc2_);
         if(false)
         {
            5;
            §§pop();
            §§pop();
            §§pop();
            §§pop();
            §§pop();
            §§pop();
            §§pop();
            §§pop();
            §§pop();
         }
         else
         {
            §§pop().Hint(§§pop(),§§pop(),§§pop(),§§pop(),§§pop(),§§pop(),§§pop(),§§pop());
         }
      }
      
      internal static function smc_onRollOut(param1:MouseEvent) : *
      {
         §§push(xmessage);
         if(false)
         {
            return;
         }
         §§push(main.hint);
         if(false)
         {
            5;
            §§pop();
         }
         else
         {
            §§pop().HintOff();
         }
      }
      
      public static function OnHomePage(param1:MouseEvent) : *
      {
         §§push(xmessage);
         if(false)
         {
            return;
         }
         var _loc2_:* = param1.currentTarget.HomePage;
         if(!_loc2_)
         {
            return;
         }
         if(_loc2_.substr(0,7).toLowerCase() != "http://")
         {
            _loc2_ = "http://" + _loc2_;
         }
         _loc2_ = xatlib.xatlinks(_loc2_);
         if(chat.isKeyDown(Keyboard.SHIFT))
         {
            _loc2_ += "";
         }
         §§push(xatlib);
         §§push(xconst.ST(21));
         §§push(_loc2_);
         if(false)
         {
            5;
            §§pop();
            §§pop();
            §§pop();
         }
         else
         {
            §§pop().UrlPopup(§§pop(),§§pop());
         }
      }
      
      public static function DeleteMess(param1:MouseEvent) : *
      {
         §§push(xmessage);
         if(false)
         {
            return;
         }
         §§push(main.hint);
         if(false)
         {
            5;
            §§pop();
         }
         else
         {
            §§pop().HintOff();
         }
         var _loc2_:* = todo.Message.length;
         var _loc3_:* = 0;
         while(_loc3_ < _loc2_)
         {
            if(todo.Message[_loc3_].n == param1.currentTarget.DeleteNumber)
            {
               §§push(todo.Message[_loc3_]);
               §§push(true);
               if(false)
               {
                  5;
                  §§pop();
                  §§pop();
               }
               else
               {
                  §§pop().ignored = §§pop();
               }
            }
            _loc3_++;
         }
         §§push(network);
         if(false)
         {
            5;
            §§pop();
         }
         else
         {
            §§pop().RemoveUsersWithNoMessages();
         }
         §§push(network);
         §§push(param1.currentTarget.DeleteNumber);
         if(false)
         {
            5;
            §§pop();
            §§pop();
         }
         else
         {
            §§pop().NetworkDeleteMessage(§§pop());
         }
         §§push(todo);
         §§push(true);
         if(false)
         {
            5;
            §§pop();
            §§pop();
         }
         else
         {
            §§pop().DoUpdateMessages = §§pop();
         }
         §§push(todo);
         §§push(true);
         if(false)
         {
            5;
            §§pop();
            §§pop();
         }
         else
         {
            §§pop().DoBuildUserList = §§pop();
         }
      }
      
      public static function smc_onPress(param1:MouseEvent) : *
      {
         var _arg1:MouseEvent;
         var t:*;
         var self:*;
         var Dia:*;
         var w:*;
         var h:*;
         var x:*;
         var y:*;
         var f:*;
         var d:*;
         var w1:*;
         var w2:*;
         var buth:*;
         var e:*;
         §§push(xmessage);
         if(false)
         {
            return;
         }
         t = undefined;
         _arg1 = param1;
         t = undefined;
         self = undefined;
         Dia = undefined;
         w = undefined;
         h = undefined;
         x = undefined;
         y = undefined;
         f = undefined;
         d = undefined;
         w1 = undefined;
         w2 = undefined;
         buth = undefined;
         e = _arg1;
         t = e.currentTarget;
         if(t.Par)
         {
            t = t.Par;
         }
         §§push(main.hint);
         if(false)
         {
            5;
            §§pop();
         }
         else
         {
            §§pop().HintOff();
         }
         if(t.t)
         {
            §§push(t.t);
            if(false)
            {
               5;
               §§pop();
            }
            else
            {
               §§pop().Press();
            }
         }
         if(t.Radio != undefined)
         {
            if(todo.useRadio == undefined)
            {
               §§push(todo);
               §§push(t.Radio);
               if(false)
               {
                  5;
                  §§pop();
                  §§pop();
               }
               else
               {
                  §§pop().useRadio = §§pop();
               }
               §§push(chat.mainDlg);
               §§push("Radio");
               §§push(2);
               if(false)
               {
                  5;
                  §§pop();
                  §§pop();
                  §§pop();
               }
               else
               {
                  §§pop().CreateSoundIcon(§§pop(),§§pop());
               }
            }
            §§push(todo);
            §§push(t.Radio);
            if(false)
            {
               5;
               §§pop();
               §§pop();
            }
            else
            {
               §§pop().useRadio = §§pop();
            }
            return;
         }
         if(t.Gifts)
         {
            §§push(§§findproperty(OpenGifts));
            §§push(t.Gifts);
            if(false)
            {
               5;
               §§pop();
               §§pop();
            }
            else
            {
               §§pop().OpenGifts(§§pop());
            }
         }
         else if(t.xNum)
         {
            if(global.xc & 0x0800)
            {
               §§push(global);
               §§push(t.UserNo);
               if(false)
               {
                  5;
                  §§pop();
                  §§pop();
               }
               else
               {
                  §§pop().gUserNo = §§pop();
               }
               §§push(main.mcLoad);
               §§push(t.xNum);
               if(false)
               {
                  5;
                  §§pop();
                  §§pop();
               }
               else
               {
                  §§pop().OpenByN(§§pop());
               }
            }
            else
            {
               §§push(xatlib);
               §§push(t.xNum);
               if(false)
               {
                  5;
                  §§pop();
                  §§pop();
               }
               else
               {
                  §§pop().GotoXat(§§pop());
               }
            }
         }
         else if(t.UserNo)
         {
            §§push(§§findproperty(PressUserName));
            §§push(t.UserNo);
            §§push(e.ctrlKey);
            if(false)
            {
               5;
               §§pop();
               §§pop();
               §§pop();
            }
            else
            {
               §§pop().PressUserName(§§pop(),§§pop());
            }
         }
         else if(t.Power != undefined)
         {
            self = xatlib.FindUser(todo.w_userno);
            if(todo.HasPower(self,t.Power))
            {
               §§push(xatlib);
               §§push(xconst.ST(237));
               §§push(xconst.ST(238,xconst.pssa[t.Power + 1]));
               §§push(0);
               if(false)
               {
                  5;
                  §§pop();
                  §§pop();
                  §§pop();
                  §§pop();
               }
               else
               {
                  §§pop().GeneralMessage(§§pop(),§§pop(),§§pop());
               }
               Dia = main.box_layer.GeneralMessageH.Dia;
               w = Dia.DiaBack.width;
               h = Dia.DiaBack.height;
               x = Dia.DiaBack.x;
               y = Dia.DiaBack.y;
               f = 8;
               d = int(w / (f * 2 + 3));
               w1 = int(w * f / (f * 2 + 3));
               w2 = w1;
               buth = 22;
               new xBut(Dia,x + w - d - w1,y + h - buth - 20,w1,buth,"UnAssign",function(param1:*):*
               {
                  §§push(§§findproperty(AssignRel));
                  if(false)
                  {
                     return;
                  }
                  §§push(0);
                  §§push(t);
                  if(false)
                  {
                     5;
                     §§pop();
                     §§pop();
                     §§pop();
                  }
                  else
                  {
                     §§pop().AssignRel(§§pop(),§§pop());
                  }
               });
               new xBut(Dia,x + d,y + h - buth - 20,w2,buth,"Assign",function(param1:*):*
               {
                  §§push(§§findproperty(AssignRel));
                  if(false)
                  {
                     return;
                  }
                  §§push(1);
                  §§push(t);
                  if(false)
                  {
                     5;
                     §§pop();
                     §§pop();
                     §§pop();
                  }
                  else
                  {
                     §§pop().AssignRel(§§pop(),§§pop());
                  }
               });
            }
         }
      }
      
      public static function OpenGifts(param1:*, param2:int = 1) : *
      {
         §§push(xmessage);
         if(false)
         {
            return;
         }
         var _loc3_:* = xatlib.FindUser(param1);
         if(_loc3_ < 0)
         {
            return;
         }
         §§push(chat.mainDlg);
         §§push(0);
         §§push(param1);
         if(false)
         {
            5;
            §§pop();
            §§pop();
            §§pop();
         }
         else
         {
            §§pop().UpdateBackground(§§pop(),§§pop());
         }
         §§push(todo.config);
         §§push("giftid");
         §§push(param1 + "," + (todo.Users[_loc3_].registered ? todo.Users[_loc3_].registered : "") + (param1 == todo.w_userno) ? "," + todo.w_d3 + "," + todo.w_dt : "");
         if(false)
         {
            5;
            §§pop();
            §§pop();
            §§pop();
         }
         else
         {
            §§pop()[§§pop()] = §§pop();
         }
         if(param2 == 0)
         {
            return;
         }
         if(param2 == 2)
         {
            if(chat.sending_lc)
            {
               §§push(chat.sending_lc);
               §§push(chat.fromxat);
               §§push("onMsg");
               §§push(9);
               §§push("config");
               §§push(todo.config);
               if(false)
               {
                  5;
                  §§pop();
                  §§pop();
                  §§pop();
                  §§pop();
                  §§pop();
                  §§pop();
               }
               else
               {
                  §§pop().send(§§pop(),§§pop(),§§pop(),§§pop(),§§pop());
               }
            }
            return;
         }
         if(global.xc & 0x0800)
         {
            §§push(main.mcLoad);
            §§push(20044);
            if(false)
            {
               5;
               §§pop();
               §§pop();
            }
            else
            {
               §§pop().OpenByN(§§pop());
            }
         }
         else if(false)
         {
            if(todo.w_useroom != 5)
            {
               §§push(xatlib);
               §§push("20044");
               if(false)
               {
                  5;
                  §§pop();
                  §§pop();
               }
               else
               {
                  §§pop().GotoXat(§§pop());
               }
            }
         }
      }
      
      private static function AssignRel(param1:*, param2:*) : *
      {
         §§push(xmessage);
         if(false)
         {
            return;
         }
         §§push(main.box_layer.GeneralMessageH);
         if(false)
         {
            5;
            §§pop();
         }
         else
         {
            §§pop().Delete();
         }
         var _loc3_:* = new XMLDocument();
         var _loc4_:* = _loc3_.createElement("ap");
         §§push(_loc4_.attributes);
         §§push(xatlib.xInt(param2.Power).toString());
         if(false)
         {
            5;
            §§pop();
            §§pop();
         }
         else
         {
            §§pop().p = §§pop();
         }
         §§push(_loc4_.attributes);
         §§push(param1);
         if(false)
         {
            5;
            §§pop();
            §§pop();
         }
         else
         {
            §§pop().a = §§pop();
         }
         §§push(_loc3_);
         §§push(_loc4_);
         if(false)
         {
            5;
            §§pop();
            §§pop();
         }
         else
         {
            §§pop().appendChild(§§pop());
         }
         var _loc5_:String = xatlib.XMLOrder(_loc3_,new Array("p","a"));
         §§push(network.socket);
         §§push(_loc5_);
         if(false)
         {
            5;
            §§pop();
            §§pop();
         }
         else
         {
            §§pop().send(§§pop());
         }
      }
      
      public static function SmilieLoad(param1:Event) : *
      {
         §§push(xmessage);
         if(false)
         {
            return;
         }
         var _loc2_:* = param1.currentTarget;
         var _loc3_:* = _loc2_.del - 1;
         §§push(_loc2_);
         §§push(_loc3_);
         if(false)
         {
            5;
            §§pop();
            §§pop();
         }
         else
         {
            §§pop().del = §§pop();
         }
         if(param1.currentTarget.del < 0)
         {
            §§push(param1.currentTarget);
            §§push(new smiley(param1.currentTarget,param1.currentTarget.t));
            if(false)
            {
               5;
               §§pop();
               §§pop();
            }
            else
            {
               §§pop().ns = §§pop();
            }
            §§push(param1.currentTarget);
            §§push(Event.ENTER_FRAME);
            §§push(SmilieLoad);
            if(false)
            {
               5;
               §§pop();
               §§pop();
               §§pop();
            }
            else
            {
               §§pop().removeEventListener(§§pop(),§§pop());
            }
         }
      }
      
      public static function DoSound(param1:MouseEvent) : *
      {
         §§push(xmessage);
         if(false)
         {
            return;
         }
         if(param1.currentTarget.SF)
         {
            §§push(main);
            §§push(param1.currentTarget.SA);
            if(false)
            {
               5;
               §§pop();
               §§pop();
            }
            else
            {
               §§pop().PlayMusic(§§pop());
            }
            return;
         }
         §§push(main);
         §§push(param1.currentTarget.Snd);
         §§push(true);
         if(false)
         {
            5;
            §§pop();
            §§pop();
            §§pop();
         }
         else
         {
            §§pop().ProcessSounds(§§pop(),§§pop());
         }
      }
      
      public static function BuildUserList() : *
      {
         §§push(xmessage);
         if(false)
         {
            return;
         }
         var _loc1_:* = undefined;
         var _loc2_:* = undefined;
         var _loc3_:* = undefined;
         var _loc4_:* = undefined;
         var _loc5_:* = undefined;
         var _loc6_:* = undefined;
         var _loc7_:* = undefined;
         var _loc8_:* = undefined;
         var _loc9_:* = false;
         var _loc10_:* = undefined;
         var _loc11_:* = undefined;
         var _loc12_:* = undefined;
         var _loc13_:* = getTimer();
         var _loc14_:* = -1;
         var _loc15_:Boolean = !main.ctabsmc.TabIsPrivate() && todo.Pools.length > 1 && Boolean(main.utabsmc.tabs[0].Main);
         §§push(§§findproperty(DeleteUserList));
         if(false)
         {
            5;
            §§pop();
         }
         else
         {
            §§pop().DeleteUserList();
         }
         var _loc16_:* = getTimer();
         var _loc17_:* = new Object();
         var _loc18_:* = todo.Users.length;
         §§push(§§findproperty(poin));
         §§push(new Array());
         if(false)
         {
            5;
            §§pop();
            §§pop();
         }
         else
         {
            §§pop().poin = §§pop();
         }
         if(Boolean(main.utabsmc.tabs[0].Main) || Boolean(main.utabsmc.tabs[1].Main))
         {
            _loc1_ = 0;
            while(_loc1_ < _loc18_)
            {
               _loc3_ = 0;
               if(todo.Users[_loc1_].u == todo.w_userno)
               {
                  _loc3_ = 40000;
               }
               if(todo.Users[_loc1_].online == true)
               {
                  _loc3_ += 20000;
               }
               else if(main.utabsmc.tabs[1].Main == true && todo.Users[_loc1_].onsuper == true)
               {
                  _loc3_ += 20000;
               }
               if(!(todo.Users[_loc1_].banned && !(todo.Users[_loc1_].flag0 & 0x020000)))
               {
                  _loc3_ += 10000;
               }
               if(!todo.Users[_loc1_].Stealth)
               {
                  if(todo.Users[_loc1_].mainowner)
                  {
                     _loc3_ += 4800;
                  }
                  if(todo.Users[_loc1_].owner)
                  {
                     _loc3_ += 3600;
                  }
                  if(todo.Users[_loc1_].moderator)
                  {
                     _loc3_ += 2400;
                  }
                  if(todo.Users[_loc1_].member)
                  {
                     _loc3_ += 1200;
                  }
               }
               if(todo.Users[_loc1_].friend)
               {
                  _loc3_ += 600;
               }
               if(todo.HasPower(_loc1_,35))
               {
                  _loc3_ += 400;
               }
               else if(todo.HasPower(_loc1_,1))
               {
                  _loc3_ += 300;
               }
               if(todo.Users[_loc1_].registered != undefined)
               {
                  _loc5_ = todo.Users[_loc1_].registered.length;
                  if(_loc5_ <= 9)
                  {
                     _loc3_ += 150 - _loc5_;
                  }
               }
               if(todo.Users[_loc1_].OnXat)
               {
                  _loc3_ += 75;
               }
               _loc4_ = todo.HasPower(_loc1_,9);
               if(!_loc4_)
               {
                  if(todo.Users[_loc1_].registered)
                  {
                     _loc3_ += 38;
                  }
               }
               _loc3_ += 16;
               _loc3_ *= 50000000000;
               _loc3_ -= todo.Users[_loc1_].u * 2;
               _loc3_ *= 2;
               §§push(poin);
               §§push({
                  "points":_loc3_,
                  "index":_loc1_
               });
               if(false)
               {
                  5;
                  §§pop();
                  §§pop();
               }
               else
               {
                  §§pop().push(§§pop());
               }
               if(todo.Users[_loc1_].Bride)
               {
                  §§push(_loc17_);
                  §§push(todo.Users[_loc1_].u);
                  §§push({
                     "b":todo.Users[_loc1_].Bride,
                     "index":poin.length - 1
                  });
                  if(false)
                  {
                     5;
                     §§pop();
                     §§pop();
                     §§pop();
                  }
                  else
                  {
                     §§pop()[§§pop()] = §§pop();
                  }
               }
               _loc1_++;
            }
            for(_loc1_ in _loc17_)
            {
               _loc2_ = _loc17_[_loc1_].b;
               if(Boolean(_loc17_[_loc2_]) && _loc1_ == _loc17_[_loc2_].b)
               {
                  _loc6_ = poin[_loc17_[_loc1_].index].points;
                  _loc7_ = poin[_loc17_[_loc2_].index].points;
                  if(_loc6_ > _loc7_)
                  {
                     §§push(poin[_loc17_[_loc2_].index]);
                     §§push(_loc6_ - 1);
                     if(false)
                     {
                        5;
                        §§pop();
                        §§pop();
                     }
                     else
                     {
                        §§pop().points = §§pop();
                     }
                  }
                  else
                  {
                     §§push(poin[_loc17_[_loc1_].index]);
                     §§push(_loc7_ - 1);
                     if(false)
                     {
                        5;
                        §§pop();
                        §§pop();
                     }
                     else
                     {
                        §§pop().points = §§pop();
                     }
                  }
               }
            }
         }
         else
         {
            _loc1_ = 0;
            while(_loc1_ < _loc18_)
            {
               §§push(poin);
               §§push({
                  "points":todo.Users[_loc1_].TickCnt,
                  "index":_loc1_
               });
               if(false)
               {
                  5;
                  §§pop();
                  §§pop();
               }
               else
               {
                  §§pop().push(§§pop());
               }
               _loc1_++;
            }
         }
         §§push(poin);
         §§push("points");
         §§push(Array.DESCENDING | Array.NUMERIC);
         if(false)
         {
            5;
            §§pop();
            §§pop();
            §§pop();
         }
         else
         {
            §§pop().sortOn(§§pop(),§§pop());
         }
         if(todo.DoBuildUserListScrollUp)
         {
            if(!todo.bMobile && main.uscrollmc.Scrolling != true)
            {
               §§push(main.uscrollmc);
               §§push(0);
               if(false)
               {
                  5;
                  §§pop();
                  §§pop();
               }
               else
               {
                  §§pop().position = §§pop();
               }
               §§push(main);
               if(false)
               {
                  5;
                  §§pop();
               }
               else
               {
                  §§pop().onUserScrollChange();
               }
            }
         }
         var _loc19_:* = 0;
         if(_loc15_)
         {
            _loc19_ = main.LookupPool(todo.w_pool);
            §§push(§§findproperty(AddPoolToList));
            §§push(_loc19_);
            if(false)
            {
               5;
               §§pop();
               §§pop();
            }
            else
            {
               §§pop().AddPoolToList(§§pop());
            }
         }
         §§push(§§findproperty(useryc2));
         §§push(useryc);
         if(false)
         {
            5;
            §§pop();
            §§pop();
         }
         else
         {
            §§pop().useryc2 = §§pop();
         }
         var _loc20_:* = todo.Users.length;
         var _loc21_:* = 0;
         while(_loc21_ < _loc20_)
         {
            _loc8_ = poin[_loc21_].index;
            §§push(todo.Users[_loc8_]);
            §§push(false);
            if(false)
            {
               5;
               §§pop();
               §§pop();
            }
            else
            {
               §§pop().Vis = §§pop();
            }
            §§push(todo.Users[_loc8_]);
            §§push(network.OnIgnoreList(todo.Users[_loc8_].u));
            if(false)
            {
               5;
               §§pop();
               §§pop();
            }
            else
            {
               §§pop().ignored = §§pop();
            }
            if(todo.Users[_loc8_].u != -1)
            {
               _loc9_ = false;
               if(main.utabsmc.tabs[1].Main)
               {
                  _loc9_ = Boolean(todo.Users[_loc8_].friend) || xatlib.xInt(todo.Users[_loc8_].Location) >= 128;
                  if(todo.Users[_loc8_].u == todo.w_userno)
                  {
                     _loc9_ = false;
                  }
               }
               else if(main.utabsmc.tabs[0].Main)
               {
                  if(main.ctabsmc.TabIsPrivate())
                  {
                     if(main.ctabsmc.TabUser() == todo.Users[_loc8_].u)
                     {
                        _loc9_ = true;
                     }
                  }
                  else
                  {
                     _loc9_ = todo.Users[_loc8_].online != undefined;
                     _loc10_ = todo.Message.length;
                     if(todo.Users[_loc8_].online == false && _loc10_ < 40)
                     {
                        _loc9_ = false;
                        _loc11_ = 0;
                        while(_loc11_ < _loc10_)
                        {
                           if(todo.Message[_loc11_].u == todo.Users[_loc8_].u)
                           {
                              _loc9_ = true;
                              break;
                           }
                           _loc11_++;
                        }
                     }
                  }
                  if(todo.w_userno == todo.Users[_loc8_].u)
                  {
                     _loc9_ = true;
                  }
               }
               else
               {
                  _loc9_ = Boolean(todo.Users[_loc8_].TickCnt);
               }
               if(_loc9_)
               {
                  §§push(todo.Users[_loc8_]);
                  §§push(true);
                  if(false)
                  {
                     5;
                     §§pop();
                     §§pop();
                  }
                  else
                  {
                     §§pop().Vis = §§pop();
                  }
                  §§push(§§findproperty(DoBride));
                  §§push(_loc8_);
                  if(false)
                  {
                     5;
                     §§pop();
                     §§pop();
                  }
                  else
                  {
                     §§pop().DoBride(§§pop());
                  }
                  if(_loc14_ >= 0 && todo.Users[_loc8_].Bride == todo.Users[_loc14_].u && todo.Users[_loc14_].Bride == todo.Users[_loc8_].u)
                  {
                     §§push(§§findproperty(DoBride));
                     §§push(_loc8_);
                     §§push(1);
                     if(false)
                     {
                        5;
                        §§pop();
                        §§pop();
                        §§pop();
                     }
                     else
                     {
                        §§pop().DoBride(§§pop(),§§pop());
                     }
                     §§push(§§findproperty(DoBride));
                     §§push(_loc14_);
                     §§push(1);
                     if(false)
                     {
                        5;
                        §§pop();
                        §§pop();
                        §§pop();
                     }
                     else
                     {
                        §§pop().DoBride(§§pop(),§§pop());
                     }
                     if(todo.Users[_loc8_].aFlags & 1)
                     {
                        §§push(todo.Users[_loc14_]);
                        §§push(todo.Users[_loc14_].M_St | 0x10);
                        if(false)
                        {
                           5;
                           §§pop();
                           §§pop();
                        }
                        else
                        {
                           §§pop().M_St = §§pop();
                        }
                     }
                     else
                     {
                        §§push(todo.Users[_loc14_]);
                        §§push(todo.Users[_loc14_].M_St | 0x20);
                        if(false)
                        {
                           5;
                           §§pop();
                           §§pop();
                        }
                        else
                        {
                           §§pop().M_St = §§pop();
                        }
                     }
                  }
                  §§push(§§findproperty(AddUserToList));
                  §§push(_loc14_);
                  if(false)
                  {
                     5;
                     §§pop();
                     §§pop();
                  }
                  else
                  {
                     §§pop().AddUserToList(§§pop());
                  }
                  _loc14_ = _loc8_;
               }
            }
            _loc21_++;
         }
         §§push(§§findproperty(AddUserToList));
         §§push(_loc14_);
         if(false)
         {
            5;
            §§pop();
            §§pop();
         }
         else
         {
            §§pop().AddUserToList(§§pop());
         }
         if(_loc15_)
         {
            _loc12_ = 0;
            while(_loc12_ < todo.Pools.length)
            {
               if(_loc12_ != _loc19_)
               {
                  §§push(§§findproperty(AddPoolToList));
                  §§push(_loc12_);
                  if(false)
                  {
                     5;
                     §§pop();
                     §§pop();
                  }
                  else
                  {
                     §§pop().AddPoolToList(§§pop());
                  }
               }
               _loc12_++;
            }
         }
         §§push(§§findproperty(useryc3));
         §§push(useryc);
         if(false)
         {
            5;
            §§pop();
            §§pop();
         }
         else
         {
            §§pop().useryc3 = §§pop();
         }
      }
      
      public static function DoBride(param1:*, param2:* = 0) : *
      {
         §§push(xmessage);
         if(false)
         {
            return;
         }
         §§push(todo.Users[param1]);
         §§push(0);
         if(false)
         {
            5;
            §§pop();
            §§pop();
         }
         else
         {
            §§pop().M_St = §§pop();
         }
         if(todo.Users[param1].registered == undefined)
         {
            return;
         }
         if(todo.HasPower(param1,9))
         {
            return;
         }
         if(Boolean(todo.Users[param1].Bride) && !param2)
         {
            if(todo.Users[param1].aFlags & 1)
            {
               §§push(todo.Users[param1]);
               §§push(4);
               if(false)
               {
                  5;
                  §§pop();
                  §§pop();
               }
               else
               {
                  §§pop().M_St = §§pop();
               }
            }
            else
            {
               §§push(todo.Users[param1]);
               §§push(2);
               if(false)
               {
                  5;
                  §§pop();
                  §§pop();
               }
               else
               {
                  §§pop().M_St = §§pop();
               }
            }
         }
         else
         {
            §§push(todo.Users[param1]);
            §§push(1);
            if(false)
            {
               5;
               §§pop();
               §§pop();
            }
            else
            {
               §§pop().M_St = §§pop();
            }
         }
         if(!todo.Users[param1].VIP || todo.HasPower(param1,2))
         {
            §§push(todo.Users[param1]);
            §§push(todo.Users[param1].M_St | 8);
            if(false)
            {
               5;
               §§pop();
               §§pop();
            }
            else
            {
               §§pop().M_St = §§pop();
            }
         }
         §§push(todo.Users[param1]);
         §§push(todo.Users[param1].M_St | 0x80);
         if(false)
         {
            5;
            §§pop();
            §§pop();
         }
         else
         {
            §§pop().M_St = §§pop();
         }
      }
      
      public static function ClearLists(param1:Boolean) : *
      {
         §§push(xmessage);
         if(false)
         {
            return;
         }
         var _loc2_:* = undefined;
         var _loc3_:* = undefined;
         var _loc4_:* = 0;
         var _loc5_:* = todo.Message.length;
         §§push(§§findproperty(p));
         §§push(null);
         if(false)
         {
            5;
            §§pop();
            §§pop();
         }
         else
         {
            §§pop().p = §§pop();
         }
         _loc3_ = 0;
         while(_loc3_ < _loc5_)
         {
            if(todo.Message[_loc4_].s & 2)
            {
               _loc4_++;
            }
            else
            {
               §§push(xmessage);
               §§push(_loc4_);
               if(false)
               {
                  5;
                  §§pop();
                  §§pop();
               }
               else
               {
                  §§pop().DeleteOneMessageMc(§§pop());
               }
               §§push(todo.Message);
               §§push(_loc4_);
               §§push(1);
               if(false)
               {
                  5;
                  §§pop();
                  §§pop();
                  §§pop();
               }
               else
               {
                  §§pop().splice(§§pop(),§§pop());
               }
            }
            _loc3_++;
         }
         §§push(§§findproperty(DeleteUserList));
         §§push(1);
         if(false)
         {
            5;
            §§pop();
            §§pop();
         }
         else
         {
            §§pop().DeleteUserList(§§pop());
         }
         _loc2_ = 0;
         while(_loc2_ < todo.Users.length)
         {
            if((param1 || todo.Users[_loc2_].u != todo.w_userno) && xatlib.xInt(todo.Users[_loc2_].Location) < 128)
            {
               §§push(todo.Users);
               §§push(_loc2_);
               §§push(1);
               if(false)
               {
                  5;
                  §§pop();
                  §§pop();
                  §§pop();
               }
               else
               {
                  §§pop().splice(§§pop(),§§pop());
               }
            }
            else
            {
               _loc2_++;
            }
         }
      }
      
      public static function DeleteOneUserMc(param1:Number) : *
      {
         §§push(xmessage);
         if(false)
         {
            return;
         }
         if(param1 < 0)
         {
            return;
         }
         var _loc2_:* = todo.Users[param1];
         if(!_loc2_)
         {
            return;
         }
         if(!_loc2_.mc)
         {
            return;
         }
         if(Boolean(_loc2_.mc.av1) && Boolean(_loc2_.mc.parent))
         {
            §§push(_loc2_.mc.parent);
            §§push(_loc2_.mc.av1);
            if(false)
            {
               5;
               §§pop();
               §§pop();
            }
            else
            {
               §§pop().removeChild(§§pop());
            }
         }
         §§push(_loc2_.mc);
         §§push(undefined);
         if(false)
         {
            5;
            §§pop();
            §§pop();
         }
         else
         {
            §§pop().av1 = §§pop();
         }
         if(_loc2_.mc.parent)
         {
            §§push(_loc2_.mc.parent);
            §§push(_loc2_.mc);
            if(false)
            {
               5;
               §§pop();
               §§pop();
            }
            else
            {
               §§pop().removeChild(§§pop());
            }
         }
         §§push(_loc2_);
         §§push(undefined);
         if(false)
         {
            5;
            §§pop();
            §§pop();
         }
         else
         {
            §§pop().mc = §§pop();
         }
         §§push(todo);
         §§push(true);
         if(false)
         {
            5;
            §§pop();
            §§pop();
         }
         else
         {
            §§pop().DoBuildUserList = §§pop();
         }
      }
      
      public static function DeleteUserList(param1:* = false) : *
      {
         §§push(xmessage);
         if(false)
         {
            return;
         }
         var _loc2_:* = undefined;
         §§push(§§findproperty(useryc));
         §§push(9);
         if(false)
         {
            5;
            §§pop();
            §§pop();
         }
         else
         {
            §§pop().useryc = §§pop();
         }
         while(true)
         {
            _loc2_ = main.uMessLst.pop();
            if(!_loc2_)
            {
               break;
            }
            if(_loc2_.av1 != undefined)
            {
               §§push(_loc2_);
               §§push(_loc2_.av1);
               if(false)
               {
                  5;
                  §§pop();
                  §§pop();
               }
               else
               {
                  §§pop().removeChild(§§pop());
               }
            }
            if(_loc2_.parent)
            {
               §§push(_loc2_.parent);
               §§push(_loc2_);
               if(false)
               {
                  5;
                  §§pop();
                  §§pop();
               }
               else
               {
                  §§pop().removeChild(§§pop());
               }
            }
         }
         var _loc3_:* = todo.Users.length;
         var _loc4_:* = 0;
         while(_loc4_ < _loc3_)
         {
            if(param1)
            {
               §§push(§§findproperty(DeleteOneUserMc));
               §§push(_loc4_);
               if(false)
               {
                  5;
                  §§pop();
                  §§pop();
               }
               else
               {
                  §§pop().DeleteOneUserMc(§§pop());
               }
            }
            else if(todo.Users[_loc4_] != undefined)
            {
               if(todo.Users[_loc4_].mc != undefined)
               {
                  §§push(todo.Users[_loc4_].mc);
                  §§push(false);
                  if(false)
                  {
                     5;
                     §§pop();
                     §§pop();
                  }
                  else
                  {
                     §§pop().visible = §§pop();
                  }
                  if(todo.Users[_loc4_].mc.av1 != undefined)
                  {
                     §§push(todo.Users[_loc4_].mc.av1);
                     §§push(false);
                     if(false)
                     {
                        5;
                        §§pop();
                        §§pop();
                     }
                     else
                     {
                        §§pop().visible = §§pop();
                     }
                     if(todo.Users[_loc4_].mc.av1.Gag)
                     {
                        §§push(todo.Users[_loc4_].mc.av1);
                        if(false)
                        {
                           5;
                           §§pop();
                        }
                        else
                        {
                           §§pop().HatsOff();
                        }
                     }
                  }
               }
            }
            _loc4_++;
         }
      }
      
      public static function AddPoolToList(param1:Number) : *
      {
         §§push(xmessage);
         if(false)
         {
            return;
         }
         var _loc2_:* = undefined;
         var _loc3_:* = undefined;
         var _loc4_:* = undefined;
         if(main.utabsmc.tabs[0].Main == false)
         {
            return;
         }
         var _loc5_:int = xatlib.xInt(todo.Pools[param1]);
         var _loc6_:* = xatlib.xInt((xatlib.xInt(todo.w_useroom) + _loc5_) % xconst.pool1.length);
         var _loc7_:* = xatlib.xInt(xatlib.xInt(todo.w_useroom) - _loc5_);
         if(_loc7_ < 0)
         {
            _loc7_ = 2147483647 - _loc7_;
         }
         _loc7_ %= xconst.pool2.length;
         var _loc8_:* = xconst.pool1[_loc6_] + " " + xconst.pool2[_loc7_];
         if(_loc5_ < 3 && (_loc2_ = todo.gconfig["g114"]) is Object)
         {
            switch(_loc5_)
            {
               case 0:
                  _loc3_ = _loc2_["m"];
                  break;
               case 1:
                  _loc3_ = _loc2_["t"];
                  break;
               case 2:
                  if(todo.HasPowerA(todo.w_GroupPowers,126))
                  {
                     _loc3_ = _loc2_["b"];
                  }
            }
            if(_loc3_ && _loc3_.length > 2)
            {
               _loc8_ = _loc3_;
               if(_loc5_ >= 1)
               {
                  _loc4_ = _loc5_ == 1 ? xatlib.RankColor(xatlib.NoToRank(_loc2_["rnk"])) : 9849600;
               }
            }
         }
         var _loc9_:* = new xBut(main.mcuserbackground,4,useryc + 3,main.upw - xatlib.NX(24),20,_loc8_,PoolPressed,0,5);
         if(_loc4_)
         {
            §§push(xatlib);
            §§push(_loc9_.but_back);
            §§push(_loc4_);
            if(false)
            {
               5;
               §§pop();
               §§pop();
               §§pop();
            }
            else
            {
               §§pop().McSetRGB(§§pop(),§§pop());
            }
            §§push(_loc9_);
            §§push(0);
            if(false)
            {
               5;
               §§pop();
               §§pop();
            }
            else
            {
               §§pop().SetTextCol(§§pop());
            }
         }
         §§push(_loc9_.But);
         §§push(param1);
         if(false)
         {
            5;
            §§pop();
            §§pop();
         }
         else
         {
            §§pop().w = §§pop();
         }
         §§push(main.uMessLst);
         §§push(_loc9_);
         if(false)
         {
            5;
            §§pop();
            §§pop();
         }
         else
         {
            §§pop().push(§§pop());
         }
         §§push(§§findproperty(useryc));
         §§push(useryc + 23);
         if(false)
         {
            5;
            §§pop();
            §§pop();
         }
         else
         {
            §§pop().useryc = §§pop();
         }
      }
      
      public static function PoolPressed(param1:MouseEvent) : *
      {
         §§push(xmessage);
         if(false)
         {
            return;
         }
         if(todo.Pools[param1.currentTarget.w] != todo.w_pool)
         {
            §§push(network);
            §§push(todo.Pools[param1.currentTarget.w]);
            if(false)
            {
               5;
               §§pop();
               §§pop();
            }
            else
            {
               §§pop().NetworkSetPool(§§pop());
            }
         }
      }
      
      public static function AddUserToList(param1:Number) : *
      {
         §§push(xmessage);
         if(false)
         {
            return;
         }
         var _loc2_:* = undefined;
         var _loc3_:* = undefined;
         var _loc4_:* = undefined;
         var _loc5_:* = undefined;
         var _loc6_:* = undefined;
         var _loc7_:* = undefined;
         var _loc8_:* = undefined;
         var _loc9_:* = undefined;
         var _loc10_:* = undefined;
         var _loc11_:* = undefined;
         var _loc12_:* = undefined;
         var _loc13_:* = undefined;
         var _loc14_:* = undefined;
         var _loc15_:* = undefined;
         var _loc16_:* = undefined;
         var _loc17_:* = undefined;
         var _loc24_:* = undefined;
         var _loc25_:GlowFilter = null;
         if(param1 < 0)
         {
            return;
         }
         var _loc18_:Number = Number(todo.Users[param1].u);
         var _loc19_:* = todo.Users[param1].n;
         var _loc20_:* = 0;
         var _loc21_:* = todo.Users[param1].s && todo.HasPower(param1,54) && (todo.Macros == undefined || todo.Macros["SetStatus"] == undefined) && !todo.Users[param1].banned;
         if(!_loc21_)
         {
            delete todo.Users[param1].s;
         }
         var _loc22_:* = undefined;
         if(Boolean(main.utabsmc.tabs[2]) && Boolean(main.utabsmc.tabs[2].Main))
         {
            _loc22_ = "tickle";
         }
         if(main.utabsmc.tabs[0].Main && xconst.f_Live & todo.FlagBits && !todo.Users[param1].mainowner && !todo.Users[param1].owner && !todo.Users[param1].moderator && !todo.Users[param1].member && todo.Users[param1].u != 4294967295 && todo.Users[param1].u != todo.w_userno && todo.Users[param1].u != 0)
         {
            return;
         }
         _loc19_ = "<l>" + _loc19_;
         var _loc23_:* = useryc < main.uph + main.uscrollmc.Scr_position + 16 && useryc > main.uscrollmc.Scr_position - 16;
         if(!_loc23_ && todo.Users[param1].mc != undefined)
         {
            §§push(§§findproperty(DeleteOneUserMc));
            §§push(param1);
            if(false)
            {
               5;
               §§pop();
               §§pop();
            }
            else
            {
               §§pop().DeleteOneUserMc(§§pop());
            }
         }
         if(todo.Users[param1].mc == undefined && _loc23_)
         {
            if(_loc22_)
            {
               _loc2_ = new xSprite();
               new smiley(_loc2_,_loc22_);
            }
            else
            {
               _loc2_ = new chatter2();
               §§push(_loc2_);
               §§push(2147483648);
               if(false)
               {
                  5;
                  §§pop();
                  §§pop();
               }
               else
               {
                  §§pop().Options = §§pop();
               }
               if(_loc18_ == todo.w_userno && Boolean(todo.Users[param1].flag0 & 0x0400))
               {
                  §§push(_loc2_);
                  §§push(0.2);
                  if(false)
                  {
                     5;
                     §§pop();
                     §§pop();
                  }
                  else
                  {
                     §§pop().alpha = §§pop();
                  }
               }
               _loc6_ = undefined;
               _loc7_ = 49152;
               if(todo.Users[param1].flag0 & 0x0200)
               {
                  §§push(_loc2_);
                  §§push(_loc2_.Options | chatter2.Mob);
                  if(false)
                  {
                     5;
                     §§pop();
                     §§pop();
                  }
                  else
                  {
                     §§pop().Options = §§pop();
                  }
               }
               _loc8_ = true;
               if(main.utabsmc.tabs[0].Main == true)
               {
                  if(todo.Users[param1].online)
                  {
                     if(todo.HasPower(param1,30))
                     {
                        _loc6_ = 16738740;
                     }
                     if(todo.HasPower(param1,64))
                     {
                        _loc6_ = 128;
                     }
                     if(todo.Users[param1].member)
                     {
                        _loc7_ = 6645247;
                     }
                     if(todo.Users[param1].moderator)
                     {
                        _loc8_ = false;
                        _loc7_ = 16777215;
                     }
                     if(!todo.Users[param1].Stealth)
                     {
                        if(Boolean(todo.Users[param1].owner) || Boolean(todo.Users[param1].mainowner))
                        {
                           _loc8_ = false;
                           _loc7_ = 16750848;
                        }
                     }
                     _loc24_ = false;
                     if(todo.HasPower(param1,35))
                     {
                        _loc8_ = true;
                        _loc6_ = 8388736;
                     }
                     if(todo.HasPower(param1,153))
                     {
                        _loc8_ = true;
                        _loc6_ = 16041823;
                        _loc24_ = "p1gold";
                     }
                     if(todo.HasPower(param1,294))
                     {
                        _loc8_ = true;
                        _loc6_ = 255;
                        _loc24_ = "p1ruby";
                     }
                     if(todo.HasPower(param1,295))
                     {
                        _loc8_ = true;
                        _loc6_ = 16777215;
                        _loc24_ = "p1awesome";
                     }
                     if(todo.HasPower(param1,213))
                     {
                        _loc8_ = true;
                        _loc6_ = 14423100;
                        _loc24_ = "p1ruby";
                     }
                     if(todo.Users[param1].custom_pawn != undefined)
                     {
                        _loc8_ = true;
                        _loc6_ = xatlib.DecodeColor(todo.Users[param1].custom_pawn);
                     }
                     if(todo.Users[param1].aFlags & 0x200000)
                     {
                        _loc8_ = true;
                        _loc6_ = 1304549;
                     }
                     if(!todo.HasPower(param1,67) || todo.bThin)
                     {
                        if(!_loc8_ || _loc6_ == undefined)
                        {
                           _loc6_ = _loc7_;
                        }
                        _loc7_ = undefined;
                     }
                  }
                  else if(!main.ctabsmc.TabIsPrivate() || todo.Users[param1].onsuper != true)
                  {
                     _loc7_ = 16711680;
                  }
                  if(_loc7_ != 16711680)
                  {
                     if(todo.Users[param1].ignored)
                     {
                        _loc7_ = 6316128;
                        _loc6_ = undefined;
                     }
                     if(Boolean(todo.Users[param1].banned) && !(todo.Users[param1].flag0 & 0x020000))
                     {
                        _loc7_ = 9849600;
                        _loc6_ = undefined;
                     }
                  }
               }
               else
               {
                  if(todo.Users[param1].ignored)
                  {
                     _loc7_ = 6316128;
                  }
                  if(todo.Users[param1].onsuper != true)
                  {
                     _loc7_ = 16711680;
                  }
               }
               if(_loc6_ == undefined)
               {
                  _loc6_ = _loc7_;
                  _loc7_ = undefined;
               }
               §§push(_loc2_);
               §§push(_loc6_);
               if(false)
               {
                  5;
                  §§pop();
                  §§pop();
               }
               else
               {
                  §§pop().ColP1 = §§pop();
               }
               §§push(_loc2_);
               §§push(_loc7_);
               if(false)
               {
                  5;
                  §§pop();
                  §§pop();
               }
               else
               {
                  §§pop().ColP2 = §§pop();
               }
            }
            §§push(_loc2_);
            §§push(_loc18_);
            if(false)
            {
               5;
               §§pop();
               §§pop();
            }
            else
            {
               §§pop().UserNo = §§pop();
            }
            §§push(main.mcuserbackground);
            §§push(_loc2_);
            if(false)
            {
               5;
               §§pop();
               §§pop();
            }
            else
            {
               §§pop().addChild(§§pop());
            }
            §§push(_loc2_);
            §§push(5);
            if(false)
            {
               5;
               §§pop();
               §§pop();
            }
            else
            {
               §§pop().x = §§pop();
            }
            §§push(_loc2_);
            §§push(MouseEvent.ROLL_OVER);
            §§push(ChatterRollover);
            if(false)
            {
               5;
               §§pop();
               §§pop();
               §§pop();
            }
            else
            {
               §§pop().addEventListener(§§pop(),§§pop());
            }
            §§push(_loc2_);
            §§push(MouseEvent.ROLL_OUT);
            §§push(main.hint.HintOff);
            if(false)
            {
               5;
               §§pop();
               §§pop();
               §§pop();
            }
            else
            {
               §§pop().addEventListener(§§pop(),§§pop());
            }
            §§push(_loc2_);
            §§push(MouseEvent.MOUSE_DOWN);
            §§push(ChatterOnPress);
            if(false)
            {
               5;
               §§pop();
               §§pop();
               §§pop();
            }
            else
            {
               §§pop().addEventListener(§§pop(),§§pop());
            }
            §§push(_loc2_);
            §§push(true);
            if(false)
            {
               5;
               §§pop();
               §§pop();
            }
            else
            {
               §§pop().buttonMode = §§pop();
            }
            if(_loc24_ == "p1gold" && _loc8_ == true)
            {
               §§push(_loc2_);
               §§push("p1gold");
               if(false)
               {
                  5;
                  §§pop();
                  §§pop();
               }
               else
               {
                  §§pop().Pawn = §§pop();
               }
               if(todo.HasPower(param1,35) && Boolean(todo.Users[param1].Powers[0] & 1))
               {
                  §§push(_loc2_);
                  §§push(_loc2_.Options | chatter2.flash);
                  if(false)
                  {
                     5;
                     §§pop();
                     §§pop();
                  }
                  else
                  {
                     §§pop().Options = §§pop();
                  }
               }
            }
            if(_loc24_ == "p1ruby" && _loc8_ == true)
            {
               §§push(_loc2_);
               §§push("p1ruby");
               if(false)
               {
                  5;
                  §§pop();
                  §§pop();
               }
               else
               {
                  §§pop().Pawn = §§pop();
               }
               if(todo.HasPower(param1,35) && Boolean(todo.Users[param1].Powers[0] & 1))
               {
                  §§push(_loc2_);
                  §§push(_loc2_.Options | chatter2.flash);
                  if(false)
                  {
                     5;
                     §§pop();
                     §§pop();
                  }
                  else
                  {
                     §§pop().Options = §§pop();
                  }
               }
            }
            if(_loc24_ == "p1awesome" && _loc8_ == true)
            {
               §§push(_loc2_);
               §§push("p1awesome");
               if(false)
               {
                  5;
                  §§pop();
                  §§pop();
               }
               else
               {
                  §§pop().Pawn = §§pop();
               }
               if(todo.HasPower(param1,35) && Boolean(todo.Users[param1].Powers[0] & 1))
               {
                  §§push(_loc2_);
                  §§push(_loc2_.Options | chatter2.flash);
                  if(false)
                  {
                     5;
                     §§pop();
                     §§pop();
                  }
                  else
                  {
                     §§pop().Options = §§pop();
                  }
               }
            }
            if(todo.HasPower(param1,12))
            {
               if(true)
               {
                  _loc9_ = todo.Users[param1].n.split("(hat");
                  if(_loc9_[1] != undefined)
                  {
                     _loc9_ = _loc9_[1].split(")");
                     _loc10_ = _loc9_[0].split("#");
                     if(_loc10_[1])
                     {
                        _loc11_ = _loc10_[1].charAt(0);
                        if(xconst.Pawns && network.YC < xconst.Pawns["time"])
                        {
                           _loc13_ = _loc10_[1].charAt(1);
                           if(Boolean(xconst.Pawns[_loc13_]) && todo.HasPower(param1,xconst.Pawns[_loc13_][0]))
                           {
                              §§push(_loc2_);
                              §§push(xconst.Pawns[_loc13_][1]);
                              if(false)
                              {
                                 5;
                                 §§pop();
                                 §§pop();
                              }
                              else
                              {
                                 §§pop().Pawn = §§pop();
                              }
                           }
                           if(_loc11_ != "h")
                           {
                              §§push(_loc10_);
                              §§push(1);
                              §§push(_loc11_);
                              if(false)
                              {
                                 5;
                                 §§pop();
                                 §§pop();
                                 §§pop();
                              }
                              else
                              {
                                 §§pop()[§§pop()] = §§pop();
                              }
                           }
                        }
                        _loc12_ = todo.Users[param1].Powers[0] & 1;
                        if(_loc11_ == "g" && todo.HasPower(param1,-3))
                        {
                           _loc12_ |= 2;
                        }
                        if(_loc10_[1] != "z" || !todo.HasPower(param1,99) || Boolean(todo.Users[param1].Bride))
                        {
                           §§push(_loc2_);
                           §§push(_loc12_ + ";" + xatlib.DecodeColor(_loc10_[2]) + ";" + _loc10_[1]);
                           if(false)
                           {
                              5;
                              §§pop();
                              §§pop();
                           }
                           else
                           {
                              §§pop().Hat = §§pop();
                           }
                        }
                        else
                        {
                           §§push(_loc2_);
                           §§push(_loc2_.Options | chatter2.Single);
                           if(false)
                           {
                              5;
                              §§pop();
                              §§pop();
                           }
                           else
                           {
                              §§pop().Options = §§pop();
                           }
                        }
                     }
                  }
               }
            }
            if(todo.foe && todo.Users[param1].friend == 3)
            {
               §§push(_loc2_);
               §§push("p1foe");
               if(false)
               {
                  5;
                  §§pop();
                  §§pop();
               }
               else
               {
                  §§pop().Pawn = §§pop();
               }
            }
            else
            {
               if(todo.Users[param1].flag0 & 0x2000)
               {
                  §§push(_loc2_);
                  §§push("p1bot");
                  if(false)
                  {
                     5;
                     §§pop();
                     §§pop();
                  }
                  else
                  {
                     §§pop().Pawn = §§pop();
                  }
                  if(todo.HasPower(param1,213))
                  {
                     §§push(_loc2_);
                     §§push(_loc2_.Pawn + "ruby");
                     if(false)
                     {
                        5;
                        §§pop();
                        §§pop();
                     }
                     else
                     {
                        §§pop().Pawn = §§pop();
                     }
                  }
               }
               if(!_loc2_.Pawn && _loc8_ == true && _loc24_ != false)
               {
                  §§push(_loc2_);
                  §§push(_loc24_);
                  if(false)
                  {
                     5;
                     §§pop();
                     §§pop();
                  }
                  else
                  {
                     §§pop().Pawn = §§pop();
                  }
                  if(todo.Users[param1].flag0 & 0x040000)
                  {
                     §§push(_loc2_);
                     §§push("p1badge");
                     if(false)
                     {
                        5;
                        §§pop();
                        §§pop();
                     }
                     else
                     {
                        §§pop().Pawn = §§pop();
                     }
                  }
               }
            }
            if(todo.Users[param1].w == 184)
            {
               §§push(_loc2_);
               §§push("p1zip");
               if(false)
               {
                  5;
                  §§pop();
                  §§pop();
               }
               else
               {
                  §§pop().Pawn = §§pop();
               }
            }
            if(todo.Users[param1].w == 176)
            {
               §§push(_loc2_);
               §§push(1);
               if(false)
               {
                  5;
                  §§pop();
                  §§pop();
               }
               else
               {
                  §§pop().flag2 = §§pop();
               }
            }
            if(todo.HasPower(param1,303))
            {
               §§push(§§findproperty(_pgCol));
               §§push(todo.Users[param1].n.split("(pglow#",2));
               if(false)
               {
                  5;
                  §§pop();
                  §§pop();
               }
               else
               {
                  §§pop()._pgCol = §§pop();
               }
               if(_pgCol.length == 2)
               {
                  _loc25_ = new GlowFilter(xatlib.DecodeColor(_pgCol[1].split(")")[0]),0.5,2,2,3,2,false,false);
                  §§push(_loc2_);
                  §§push([_loc25_]);
                  if(false)
                  {
                     5;
                     §§pop();
                     §§pop();
                  }
                  else
                  {
                     §§pop().filters = §§pop();
                  }
               }
            }
            _loc3_ = new MovieClip();
            §§push(main.mcuserbackground);
            §§push(_loc3_);
            if(false)
            {
               5;
               §§pop();
               §§pop();
            }
            else
            {
               §§pop().addChild(§§pop());
            }
            §§push(_loc3_);
            §§push(_loc2_.x);
            if(false)
            {
               5;
               §§pop();
               §§pop();
            }
            else
            {
               §§pop().x = §§pop();
            }
            §§push(todo.Users[param1]);
            §§push(_loc3_);
            if(false)
            {
               5;
               §§pop();
               §§pop();
            }
            else
            {
               §§pop().mc = §§pop();
            }
            §§push(todo.Users[param1].mc);
            §§push(_loc2_);
            if(false)
            {
               5;
               §§pop();
               §§pop();
            }
            else
            {
               §§pop().av1 = §§pop();
            }
            _loc4_ = [];
            if(todo.HasPower(param1,21))
            {
               _loc4_ = NameCol(param1);
            }
            if(_loc18_ == todo.w_userno || Boolean(todo.Users[param1].friend))
            {
               _loc19_ = "<b> " + _loc19_ + " <b>";
            }
            if(todo.Users[param1].banned && !todo.Users[param1].friend && !todo.Users[param1].w || Boolean(todo.Users[param1].forever))
            {
               if(todo.Users[param1].flag0 & 0x1000)
               {
                  _loc19_ = "<l>" + xconst.ST(236);
               }
               else
               {
                  _loc19_ = "<l>" + xconst.ST(25);
               }
            }
            _loc5_ = xatlib.xInt(todo.Users[param1].xNum);
            if(xatlib.xInt(todo.Users[param1].Location) >= 128)
            {
               _loc5_ = 10000 + todo.Users[param1].Location;
            }
            if(_loc5_)
            {
               _loc19_ = (_loc4_[1] == undefined ? " " : "") + "(>" + _loc5_ + ") " + _loc19_;
            }
            §§push(todo);
            §§push(xatlib.xRand(1,9999));
            if(false)
            {
               5;
               §§pop();
               §§pop();
            }
            else
            {
               §§pop().Random = §§pop();
            }
            _loc20_ = AddMessageToMc(_loc3_,2,_loc19_,12,1999,_loc21_ ? -10 : -5,_loc18_,undefined,_loc4_[0],_loc4_[1]);
            if(_loc21_)
            {
               _loc14_ = new TextField();
               §§push(_loc14_);
               §§push(16);
               if(false)
               {
                  5;
                  §§pop();
                  §§pop();
               }
               else
               {
                  §§pop().x = §§pop();
               }
               §§push(_loc14_);
               §§push(6);
               if(false)
               {
                  5;
                  §§pop();
                  §§pop();
               }
               else
               {
                  §§pop().y = §§pop();
               }
               §§push(_loc14_);
               §§push(200);
               if(false)
               {
                  5;
                  §§pop();
                  §§pop();
               }
               else
               {
                  §§pop().width = §§pop();
               }
               §§push(_loc14_);
               §§push(20);
               if(false)
               {
                  5;
                  §§pop();
                  §§pop();
               }
               else
               {
                  §§pop().height = §§pop();
               }
               §§push(_loc3_);
               §§push(_loc14_);
               if(false)
               {
                  5;
                  §§pop();
                  §§pop();
               }
               else
               {
                  §§pop().addChild(§§pop());
               }
               §§push(§§findproperty(_status));
               §§push(todo.Users[param1].s.split("#",3));
               if(false)
               {
                  5;
                  §§pop();
                  §§pop();
               }
               else
               {
                  §§pop()._status = §§pop();
               }
               §§push(main.fmts);
               §§push(2105376);
               if(false)
               {
                  5;
                  §§pop();
                  §§pop();
               }
               else
               {
                  §§pop().color = §§pop();
               }
               if(_status.length == 3 && todo.HasPower(param1,289))
               {
                  §§push(main.fmts);
                  §§push(xatlib.DecodeColor(_status[2]));
                  if(false)
                  {
                     5;
                     §§pop();
                     §§pop();
                  }
                  else
                  {
                     §§pop().color = §§pop();
                  }
               }
               §§push(_loc14_);
               §§push(main.fmts);
               if(false)
               {
                  5;
                  §§pop();
                  §§pop();
               }
               else
               {
                  §§pop().defaultTextFormat = §§pop();
               }
               §§push(_loc14_);
               §§push(_status[0]);
               if(false)
               {
                  5;
                  §§pop();
                  §§pop();
               }
               else
               {
                  §§pop().text = §§pop();
               }
               if(_status.length >= 2 && todo.HasPower(param1,231))
               {
                  _loc25_ = new GlowFilter(xatlib.DecodeColor(_status[1]),0.7,3,3,4,3,false,false);
                  §§push(_loc14_);
                  §§push([_loc25_]);
                  if(false)
                  {
                     5;
                     §§pop();
                     §§pop();
                  }
                  else
                  {
                     §§pop().filters = §§pop();
                  }
               }
            }
         }
         if(todo.Users[param1].mc != undefined && todo.Users[param1].mc.av1 != undefined)
         {
            _loc2_ = todo.Users[param1].mc.av1;
            §§push(todo.Users[param1].mc.av1);
            §§push(_loc2_.Options & (chatter2.Mob | chatter2.Single | chatter2.flash));
            if(false)
            {
               5;
               §§pop();
               §§pop();
            }
            else
            {
               §§pop().Options = §§pop();
            }
            if(todo.Users[param1].gagged)
            {
               §§push(_loc2_);
               §§push(_loc2_.Options | chatter2.Gag);
               if(false)
               {
                  5;
                  §§pop();
                  §§pop();
               }
               else
               {
                  §§pop().Options = §§pop();
               }
            }
            §§push(todo.Users[param1].mc);
            §§push(true);
            if(false)
            {
               5;
               §§pop();
               §§pop();
            }
            else
            {
               §§pop().visible = §§pop();
            }
            §§push(todo.Users[param1].mc.av1);
            §§push(true);
            if(false)
            {
               5;
               §§pop();
               §§pop();
            }
            else
            {
               §§pop().visible = §§pop();
            }
            §§push(_loc2_);
            §§push(todo.Users[param1].flag0);
            if(false)
            {
               5;
               §§pop();
               §§pop();
            }
            else
            {
               §§pop().flag0 = §§pop();
            }
            _loc16_ = useryc + 5;
            if(_loc21_)
            {
               _loc16_ += 6;
            }
            §§push(_loc2_);
            §§push(_loc16_);
            if(false)
            {
               5;
               §§pop();
               §§pop();
            }
            else
            {
               §§pop().y = §§pop();
            }
            §§push(todo.Users[param1].mc);
            §§push(_loc16_ + 1);
            if(false)
            {
               5;
               §§pop();
               §§pop();
            }
            else
            {
               §§pop().y = §§pop();
            }
            §§push(todo.Users[param1]);
            §§push(todo.Users[param1].M_St & -129);
            if(false)
            {
               5;
               §§pop();
               §§pop();
            }
            else
            {
               §§pop().M_St = §§pop();
            }
            if(todo.Users[param1].M_St & 4)
            {
               §§push(_loc2_);
               §§push(_loc2_.Options | chatter2.BFF2);
               if(false)
               {
                  5;
                  §§pop();
                  §§pop();
               }
               else
               {
                  §§pop().Options = §§pop();
               }
            }
            else if(todo.Users[param1].M_St & 2)
            {
               §§push(_loc2_);
               §§push(_loc2_.Options | chatter2.Married2);
               if(false)
               {
                  5;
                  §§pop();
                  §§pop();
               }
               else
               {
                  §§pop().Options = §§pop();
               }
            }
            else if(todo.Users[param1].M_St & 1)
            {
               §§push(_loc2_);
               §§push(_loc2_.Options | chatter2.Star);
               if(false)
               {
                  5;
                  §§pop();
                  §§pop();
               }
               else
               {
                  §§pop().Options = §§pop();
               }
            }
            if(todo.Users[param1].M_St & 8)
            {
               §§push(_loc2_);
               §§push(65793);
               if(false)
               {
                  5;
                  §§pop();
                  §§pop();
               }
               else
               {
                  §§pop().ColF = §§pop();
               }
            }
            if(todo.Users[param1].M_St & 0x10)
            {
               §§push(_loc2_);
               §§push(_loc2_.Options | chatter2.BFF);
               if(false)
               {
                  5;
                  §§pop();
                  §§pop();
               }
               else
               {
                  §§pop().Options = §§pop();
               }
            }
            if(todo.Users[param1].M_St & 0x20)
            {
               §§push(_loc2_);
               §§push(_loc2_.Options | chatter2.Married);
               if(false)
               {
                  5;
                  §§pop();
                  §§pop();
               }
               else
               {
                  §§pop().Options = §§pop();
               }
            }
            if(_loc2_ is chatter2)
            {
               §§push(_loc2_);
               if(false)
               {
                  5;
                  §§pop();
               }
               else
               {
                  §§pop().Go();
               }
            }
         }
         if(_loc20_ < 16)
         {
            _loc20_ = 16;
         }
         if(_loc21_)
         {
            _loc20_ = 22;
         }
         §§push(§§findproperty(useryc));
         §§push(useryc + (_loc20_ + 4));
         if(false)
         {
            5;
            §§pop();
            §§pop();
         }
         else
         {
            §§pop().useryc = §§pop();
         }
      }
      
      internal static function HatLoaded(param1:*) : *
      {
         §§push(xmessage);
         if(false)
         {
            return;
         }
         var _loc2_:* = param1.currentTarget.loader.contentLoaderInfo.content;
         §§push(_loc2_);
         §§push(_loc2_.parent.parent.HAT);
         if(false)
         {
            5;
            §§pop();
            §§pop();
         }
         else
         {
            §§pop().Go(§§pop());
         }
      }
      
      internal static function HatUnLoaded(param1:*) : *
      {
         §§push(xmessage);
         if(false)
         {
            return;
         }
         §§push(param1.currentTarget);
         §§push(true);
         if(false)
         {
            5;
            §§pop();
            §§pop();
         }
         else
         {
            §§pop().unloadAndStop(§§pop());
         }
      }
      
      public static function ChatterRollover(param1:MouseEvent) : *
      {
         §§push(xmessage);
         if(false)
         {
            return;
         }
         §§push(main.hint);
         §§push(0);
         §§push(0);
         §§push(xatlib.GetUserStatus(xatlib.FindUser(param1.currentTarget.UserNo)));
         §§push(true);
         §§push(1);
         §§push(undefined);
         §§push(0);
         §§push(param1.currentTarget);
         if(false)
         {
            5;
            §§pop();
            §§pop();
            §§pop();
            §§pop();
            §§pop();
            §§pop();
            §§pop();
            §§pop();
            §§pop();
         }
         else
         {
            §§pop().Hint(§§pop(),§§pop(),§§pop(),§§pop(),§§pop(),§§pop(),§§pop(),§§pop());
         }
      }
      
      public static function ChatterOnPress(param1:MouseEvent) : *
      {
         §§push(xmessage);
         if(false)
         {
            return;
         }
         §§push(main.hint);
         if(false)
         {
            5;
            §§pop();
         }
         else
         {
            §§pop().HintOff();
         }
         if(param1.currentTarget.UserNo == 0 || param1.currentTarget.UserNo == todo.w_userno)
         {
            §§push(main);
            §§push(1);
            if(false)
            {
               5;
               §§pop();
               §§pop();
            }
            else
            {
               §§pop().openDialog(§§pop());
            }
         }
         else if(param1.currentTarget.UserNo != 4294967295)
         {
            if(param1.ctrlKey && todo.Macros && Boolean(todo.Macros["rapid"]) && todo.HasPowerA(todo.w_Powers,91,todo.w_Mask))
            {
               §§push(§§findproperty(DoRapid));
               §§push(param1.currentTarget.UserNo);
               if(false)
               {
                  5;
                  §§pop();
                  §§pop();
               }
               else
               {
                  §§pop().DoRapid(§§pop());
               }
            }
            else
            {
               §§push(main);
               §§push(2);
               §§push(param1.currentTarget.UserNo);
               if(false)
               {
                  5;
                  §§pop();
                  §§pop();
                  §§pop();
               }
               else
               {
                  §§pop().openDialog(§§pop(),§§pop());
               }
            }
         }
      }
      
      internal static function DoRapid(param1:*) : *
      {
         §§push(xmessage);
         if(false)
         {
            return;
         }
         var _loc2_:* = undefined;
         var _loc3_:* = undefined;
         var _loc4_:* = undefined;
         var _loc5_:* = xatlib.FindUser(param1);
         if(_loc5_ == -1)
         {
            return;
         }
         var _loc6_:* = todo.Macros["rapid"].split(",");
         var _loc7_:* = 0;
         §§push(_loc6_);
         §§push(1);
         §§push(Number(_loc6_[1]));
         if(false)
         {
            5;
            §§pop();
            §§pop();
            §§pop();
         }
         else
         {
            §§pop()[§§pop()] = §§pop();
         }
         if(isNaN(_loc6_[1]))
         {
            §§push(_loc6_);
            §§push(1);
            §§push(1);
            if(false)
            {
               5;
               §§pop();
               §§pop();
               §§pop();
            }
            else
            {
               §§pop()[§§pop()] = §§pop();
            }
         }
         switch(_loc6_[0])
         {
            case "ignore":
               §§push(network);
               §§push(param1);
               if(false)
               {
                  5;
                  §§pop();
                  §§pop();
               }
               else
               {
                  §§pop().NetworkIgnore(§§pop());
               }
               break;
            case "unban":
               if(todo.Users[_loc5_].banned)
               {
                  _loc2_ = "u";
               }
               break;
            case "ban":
               if(!todo.Users[_loc5_].banned)
               {
                  _loc2_ = "g";
               }
               break;
            case "gag":
               if(!todo.Users[_loc5_].gagged)
               {
                  _loc2_ = "gg";
               }
               break;
            case "mute":
               if(!todo.Users[_loc5_].banned)
               {
                  _loc2_ = "gm";
               }
               break;
            case "member":
               if(!todo.Users[_loc5_].member)
               {
                  _loc3_ = "e";
               }
               break;
            case "guest":
               if(Boolean(todo.Users[_loc5_].member) || Boolean(todo.Users[_loc5_].moderator) || Boolean(todo.Users[_loc5_].owner))
               {
                  _loc3_ = "r";
               }
               break;
            default:
               if(!todo.Users[_loc5_].banned)
               {
                  for(_loc4_ in xconst.Puzzle)
                  {
                     if(_loc6_[0].substr(0,xconst.Puzzle[_loc4_].length) == xconst.Puzzle[_loc4_])
                     {
                        _loc2_ = "g";
                        _loc7_ = _loc4_;
                        break;
                     }
                  }
               }
         }
         if(_loc2_)
         {
            §§push(network);
            §§push(_loc2_);
            §§push(param1);
            §§push(_loc2_ != "u");
            §§push(xatlib.xInt(_loc6_[1] * 3600));
            §§push("rapid");
            §§push(_loc7_);
            if(false)
            {
               5;
               §§pop();
               §§pop();
               §§pop();
               §§pop();
               §§pop();
               §§pop();
               §§pop();
            }
            else
            {
               §§pop().NetworkGagUser(§§pop(),§§pop(),§§pop(),§§pop(),§§pop(),§§pop());
            }
         }
         if(_loc3_)
         {
            §§push(network);
            §§push(param1);
            §§push(_loc3_);
            if(false)
            {
               5;
               §§pop();
               §§pop();
               §§pop();
            }
            else
            {
               §§pop().NetworkMakeUser(§§pop(),§§pop());
            }
         }
      }
   }
}

§§push(this);
if(false)
{
   return;
}