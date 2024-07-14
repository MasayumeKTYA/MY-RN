package com.rnmusic


//import java.util.Base64
import android.media.MediaMetadataRetriever
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.WritableMap
import kotlin.io.encoding.Base64
import kotlin.io.encoding.ExperimentalEncodingApi

class RnAppModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
  private val retriever:MediaMetadataRetriever = MediaMetadataRetriever()

  override fun getName(): String {
    return "Music"
  }
  @OptIn(ExperimentalEncodingApi::class)
  @ReactMethod
  fun text(url: String,soundData:Int,promise: Promise) {
    this.retriever.setDataSource(url)
    val res = this.retriever.extractMetadata(soundData)
    val objectMap: WritableMap = Arguments.createMap()
    val picArray = this.retriever.embeddedPicture
    val str = picArray?.let { Base64.encode(it,) }
    objectMap.putString("data", res)
//    objectMap.putString("pic",str)
    promise.resolve(objectMap)

  }
  @OptIn(ExperimentalEncodingApi::class)
  @ReactMethod
  fun  setUrl(url: String,size:Int,promise: Promise){
    this.retriever.setDataSource(url)
    val objectMap: WritableMap = Arguments.createMap()
    val picArray = this.retriever.embeddedPicture
    val str = picArray?.let { Base64.encode(it,) }
    val album = this.retriever.extractMetadata(1)
    val author = this.retriever.extractMetadata(2)
    val title = this.retriever.extractMetadata(7)
    val time = this.retriever.extractMetadata(9)
    val type = this.retriever.extractMetadata(12)
    objectMap.putString("album", album)
    objectMap.putString("artist",author)
    objectMap.putString("title",title)
    if (time != null) {
      objectMap.putInt("duration", time.toInt()/1000)
    }
    objectMap.putString("type",type)
    objectMap.putString("artwork",str)

    objectMap.putInt("size",size)
    objectMap.putString("url",url)
    promise.resolve(objectMap)
  }
  @OptIn(ExperimentalEncodingApi::class)
  @ReactMethod
  fun  getSongTimer(url: String,promise: Promise){
    this.retriever.setDataSource(url)
    val objectMap: WritableMap = Arguments.createMap()
    val time = this.retriever.extractMetadata(9)
    if (time != null) {
      objectMap.putInt("duration", time.toInt()/1000)
    }
    promise.resolve(objectMap)
  }
}
 